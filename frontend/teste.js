const obj = {username: ['Eu sou um erro'], password: ["Eu sou outro erro"]}

console.log(Object.entries(obj))

Object.entries(obj).map(([key, value]) => (
    console.log(value[0])
))