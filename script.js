'use strict';

document.addEventListener("DOMContentLoaded", event => {
    const DomElement = function () {
        const div = document.createElement('div');
        div.style.cssText = `color: red !important;
    background-color: green;
    width: 100px;
    height:100px;
    position: absolute;
    top: 370px;
    left: 500px;
  `;
        div.classList.add('list');
        document.body.append(div);
        console.log('div: ', div);
    };
    DomElement.prototype.left = function () {
        const elem = document.querySelector('div');
        let  leftd = elem.style.left;
        leftd = parseInt(leftd);
        leftd = leftd - 10;
        console.log('leftd: ', leftd);
        elem.style.left = `${leftd}px`;
;
        
    };
    DomElement.prototype.right = function () {
        const elem = document.querySelector('div');
        let  leftd = elem.style.left;
        leftd = parseInt(leftd);
        leftd = leftd + 10;
        console.log('leftd: ', leftd);
        elem.style.left = `${leftd}px`;
    };
    DomElement.prototype.up = function () {
        const elem = document.querySelector('div');
        let  leftd = elem.style.top;
        leftd = parseInt(leftd);
        leftd = leftd - 10;
        elem.style.top = `${leftd}px`;
    };
    DomElement.prototype.down = function () {
        const elem = document.querySelector('div');
        let  leftd = elem.style.top;
        leftd = parseInt(leftd);
        leftd = leftd + 10;
        elem.style.top = `${leftd}px`;
    };
    const domm =new DomElement();
    document.addEventListener('keydown', function (event) {
        const target = event.code;
        // console.log('target: ', target);
        if (target === 'ArrowUp') {
            domm.up();
        } else if (target === 'ArrowDown') {
            domm.down();
        } else if (target === 'ArrowRight') {
            domm.right();
        } else if (target === 'ArrowLeft') {
            domm.left();
        }
    });
});