//número aleatorio
const randomNumber = (max = 1, min = 0)=>{
    return Math.random() * (max-min) + min;
}

//sigmoide
const sigmoid = (x) =>{
    return 1 / (1 + Math.exp(-x));
};

//derivada sigmoide
const dSigmoid = (x)=>{
    return sigmoid(x) * (1- sigmoid(x));
}

//determinar tipo
const setType = (x) => {
    if(x[0] === 1 && x[1] == 0){
        return 1;
    }else if(x[0] === 0 && x[1] == 1){
        return 2;
    }else{
        return 0;
    }
}