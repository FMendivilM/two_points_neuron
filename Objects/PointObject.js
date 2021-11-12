class PointObject{
    constructor(x, y, type = 0){
        this.x = x;
        this.y = y;
        this.type = type;
    }

    draw(){
        push();
        strokeWeight(5);
        stroke(50);
        if(this.type === 1){
            stroke(255,0,0);
        }

        if(this.type === 2){
            stroke(0,0,255);
        }
        point(this.x, this.y);
        pop();
    }

    getPosition = () =>[this.x,this.y];
}