//Note: I am NOT the author of this algorithm. Articles used as references will be mentioned in Readme file

//constant parameters needed for the algorithm
const w = [
    0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046, 1.54575, 0.1192, 1.01925,
    1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621,
];
const f = 19/81;
const c = -0.5;

function review(card, grade, path, time){ //Grade range: [1, 4]

    let s = card.s; //Stability: time in days for Retrievability to go from 1 to 0.9. Real number in range [0, INF]
    let d = card.d; //Difficulty: how hard retrieval is. Real number in range [1, 10]
    let r = retrievability(s, time); //Retrievability: probability of recalling the card. Real number in range [0, 1]

    s = stability(r, s, d, grade);
    d = difficulty(r, s, d, grade);

    const i = Math.max(interval(s), 1.0); //Interval
    const i_int = Math.round(i);

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + i_int);

    card.s = s;
    card.d = d;
    card.reviewDate = nextReview;

}

function retrievability(s, t){
    return Math.pow(1 + f * (t/s), c);
}

function interval(s){
    const r_d = 0.9;

    return (s/f) * (Math.pow(r_d, 1/c) - 1);
}

function stability(r, s, d, g){
    if (s === -1){ //Cards are initiated with stability of -1. This code only executes on first review.
        s = w[g];
    }
    else if (g === 1){ //Recall failed
        const d_f = Math.pow(d, -w[12]); //Difficulty term. Higher D => lower d_f. So, higher Difficulty => steeper stability loss
        const s_f = Math.pow(s+1, w[13]) - 1; //Stability term. Higher S => higher s_f. So, higher Stability => less stability loss
        const r_f = Math.exp(w[14] * (1-r)); //Retrievability term

        const S_f = d_f * s_f * r_f * w[11];

        s = Math.min(s, S_f); // Ensures that stability can't ever go up on failed recall
    }
    else{ //Successful recall
        const t_d = 11-d;
        const t_s = Math.pow(s, -w[9]);
        const t_r = Math.exp(w[10]*(1-r)) - 1;

        const h = (g === 2) ? w[15] : 1; //Hard penalty
        const b = (g === 4) ? w[16] : 1; //Easy bonus

        const alpha = 1 + (t_d * t_s * t_r * h * b * Math.exp(w[8]));
        s = s * alpha;
    }

    return s;
}

function difficulty(r, s, d, g){
    function d_0(g){
        return w[4] - Math.exp(w[5] * (g-1) + 1);
    }

    if (d === -1){ //Used for first review
        return d_0(g);
    }
    else{
        const delta_d = -w[6] * (g-3);
        const dp = d + delta_d * ((10-d) / 9);
        return w[7] * d_0(4) + (1-w[7]) * dp;
    }
}