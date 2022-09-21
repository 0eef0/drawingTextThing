let globalTimer = 0;

const drawing = document.getElementById("defaultCanvas0");

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

const uploadImg = () => {
    setTimeout(() => {
        document.getElementById('img').src = canvas.toDataURL('image/png');

        const data = new FormData();
        //const data = dataURLtoFile(canvas.toDataURL('image/png'), 'drawing.png');
        data.append("input_file", dataURLtoFile(canvas.toDataURL('image/png'), 'drawing.png'), 'drawing.png');
        data.append("language", "english");

        const options = {
            method: 'POST',
            headers: {
                'X-RapidAPI-Key': 'aae51eccebmshac18a8f2e468d43p154b63jsn4147fd2b418e',
                'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com'
            },
            body: data
        };

        fetch('https://text-analysis12.p.rapidapi.com/text-mining/api/v1.1', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

        clear();
    }, 750);
}


let curColor = [0,0,0];
const changeColor = (color) => {
    curColor = color;
};

let erasing = false;
const setErasing = () => {
    erasing = !erasing;
};

let penSize = 5;
const changePenSize = (size) => {
    penSize = size;
};

function setup() {
    createCanvas(500, 500);
};

function draw() {
    if(mouseIsPressed) {
        erasing ? fill(255) : fill(curColor);
        noStroke();
        circle(mouseX, mouseY, penSize);
    }
}