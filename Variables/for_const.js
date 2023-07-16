var obj = {
    prop1: 1,
    prop2: 2,
    prop3: 3
  }
  for (const prop in obj) {
    console.log(prop)
  }

{
    let keys = Object.keys(obj);
    for(let i = 0; i < keys.length; i++) {
        const prop = obj[keys[i]];
        console.log(prop);
    }
}
  
  for (const i = 0; i < 5; i++) {
    console.log(i)
  }