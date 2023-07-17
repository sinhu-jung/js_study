const OBJ = {
    prop1 : 1
};
Object.freeze(OBJ);
OBJ.prop1 = 5;
console.log(OBJ);

console.log("---------------------------------");

/**
 * @description deepfreeze 만들어보기
 */

const OBJ2 = {
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

function deepFreeze (obj) {
    if (typeof obj === "object") {
        Object.freeze(obj);
        Object.keys(obj).map((key) => {
            deepFreeze(obj[key])
        })
        return;
    }

    Object.freeze(obj)
    return;
}

deepFreeze(OBJ2);

OBJ2.prop1.prop1.prop1 = 1;
OBJ2.prop1.prop1.prop2 = 2;
OBJ2.prop1.prop1.prop3 = 3;

OBJ2.prop1.prop2.prop1 = ["a", "b", "c"];
OBJ2.prop1.prop2.prop2 = false;
OBJ2.prop1.prop2.prop3 = { a: 'a', b: 'b', c: 'c'};

OBJ2.prop2 = OBJ;
OBJ2.prop3.prop1 = 1;
OBJ2.prop3.prop2 = false;
OBJ2.prop3.prop2 = true;

console.log(OBJ2);
