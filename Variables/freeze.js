const OBJ = {
    prop1 : 1
};
Object.freeze(OBJ);
OBJ.prop1 = 5;
console.log(OBJ);