const OBJ1 = {
    prop1 : {
        prop1: {
            prop1: "a",
            prop2: "b",
            prop3: "c"
        },
        prop2 : {
            prop1: "a",
            prop2: "b",
            prop3: "c"
        }
    },
    prop2: 1,
    prop3: {
        prop1: "a",
        prop2: ["1", "2", "3"],
        prop3: false
    }
}

function deepClone(obj){
    const cloneObj = {};
    Object.assign(cloneObj, obj);

    for (const key in obj) {
        if(typeof obj[key] === 'object') {
            cloneObj[key] = deepClone(obj[key]);
        } else {
            cloneObj[key] = obj[key];
        }
    }

    return cloneObj;
}

const OBJ2 = deepClone(OBJ1);

OBJ2.prop1 = true;

console.log(OBJ1);
console.log(OBJ2);