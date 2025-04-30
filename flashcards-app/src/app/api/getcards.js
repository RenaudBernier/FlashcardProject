
export default function getcards(query) {

    const contents = {
        id: 0,
        name: 'Home',
        folders: [{
            id: 1,
            name: 'Steve',
            folders: [{
                id: 2,
                name: 'Alex',
                folders: [{
                    id: 2,
                    name: 'Alex',
                    folders: [],
                    sheets: [{name: "nest1"}, {name: "nest2"}]
                }],
                sheets: [{name: "nest1"}, {name: "nest2"}]
            },
                {
                    id: 5,
                    name: 'Alex',
                    folders: [{
                        id: 2,
                        name: 'Alex',
                        folders: [],
                        sheets: [{name: "nest1"}, {name: "nest2"}]
                    }],
                    sheets: [{name: "nest1"}, {name: "nest2"}]
                }],
            sheets: [{name: "nest1"}, {name: "nest2"}]
        }],
        sheets: [{name: "base1"}, {name: "base2"}]
    }
    
    return contents;
}