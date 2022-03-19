import { Ball } from './ball.js';
import { Block } from './block.js';

class App {
    constructor(){
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);

        //콜백함수에 변수를 넣어주려면 bind()필요
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.ball = new Ball(this.stageWidth, this.stageHeight, 50, 10);
        this.block = new Block(500, 30, 300, 450);

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        //스크린 사이즈 설정(레티나 디스플레이에서 선명하게 보이기 위해 두배로 설정 -- 해당 디스플레이는 화소 밀도가 높아 가로 2배 세로 2배 사용함)
        //현업에선 픽셀레이트를 확인하고 그에 맞게 설정함! 
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);
    }

    animate(t) {
        window.requestAnimationFrame(this.animate.bind(this));
        //이전 프레임에서 그려진 것 삭제
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        //현재 프레임 그리기
        this.block.draw(this.ctx);
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
    }
}

window.onload = () => {
    new App ();
};