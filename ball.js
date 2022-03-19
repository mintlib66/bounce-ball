export class Ball {
    constructor(stageWidth, stageHeight, radius, speed){
        this.radius = radius;
        this.vx = speed; 
        this.vy = speed;

        const diameter = this.radius * 2;
        //stage에 랜덤으로 위치할 수 있게 초기화 
        //생성위치 이슈: 블록 내에 생성되거나 x나 y가 0으로 생성된 경우
        this.x = diameter + (Math.random() * stageWidth - diameter);
        this.y = diameter + (Math.random() * stageHeight - diameter);
    }

    //canvas의 context에 그림을 그리는 함수
    draw(ctx, stageWidth, stageHeight, block) {
        //x, y는 ball의 중심점 좌표
        this.x += this.vx;
        this.y += this.vy;

        this.bounceWindow(stageWidth, stageHeight);

        this.bounceBlock(block);

        //캔버스에 공 그리기
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    //stage상에 닿았는지 판단하는 함수
    bounceWindow(stageWidth, stageHeight){
        const minX = this.radius; 
        const maxX = stageWidth - this.radius;
        const minY = this.radius; 
        const maxY = stageHeight - this.radius;

        //닿으면 공이 반대로 튕김
        if(this.x <= minX || this.x >= maxX){
            this.vx *= -1;
            this.x += this.vx;
        }
        else if(this.y <= minY || this.y >= maxY){
            this.vy *= -1;
            this.y += this.vy;
        }

    }

    bounceBlock(block) {
        const minX = block.x - this.radius;
        const maxX = block.maxX + this.radius;
        const minY = block.y - this.radius;
        const maxY = block.maxY + this.radius;

        //block의 면에 닿으면 x 또는 y만 방향전환
        //block의 모서리에 닿으면 x, y 둘다 방향전환
        if(this.x > minX && this.y > minY 
            && this.x < maxX && this.y < maxY){
              const dx1 = Math.abs(this.x - minX);  
              const dx2 = Math.abs(maxX - this.x);  
              const dy1 = Math.abs(this.y - minY);   
              const dy2 = Math.abs(maxY - this.y);  

              const minDx = Math.min(dx1, dx2);
              const minDy = Math.min(dy1, dy2);
              const min = Math.min(minDx, minDy);

              if(min == minDx){
                this.vx *= -1;
                this.x += this.vx;
                }
              if(min == minDy){
                    this.vy *= -1;
                    this.y += this.vy;
                }
            }

        
    }
}