
const genbutton = document.getElementById('generate');
genbutton.addEventListener('mouseup',()=>{
    const form = new FormData(document.getElementsByTagName('form')[0])
    console.log(form);
    let data = {};
    for (let output of form) {
        data[output[0]] = output[1];
    };
    console.log(data);

    if (data.animal === '' || data.num === '' || data.month === '') {
        alert('Please provide an answer to all three questions before generating.');
        return;
    } else if (!/^[A-Za-z]+$/.test(data.animal) || !/^[A-Za-z]+$/.test(data.month)) {
        alert('Please do not input numbers or special characters (including spaces) into the answer boxes for the first and third questions.');
        return;
    } else if (!/^[A-Za-z]{3,}$/.test(data.animal)) {
        alert('Please make your answer to the first question at least three characters.');
        return;
    };
    data.num = Number.parseInt(data.num);

    const post_password = (password) => {
        const post = document.getElementsByTagName('span')[0];
        post.innerHTML = '&nbsp;'+password;
        post.style.color = "var(--light-green)";
        post.style.opacity = "1";
        post.style.backgroundColor = 'var(--black)';
        post.parentNode.removeChild(document.getElementById('blocker'));
    };

    const find_num = () => {
        let lst = [];
        Array.from(document.getElementsByTagName('option')).map((x)=>{
            lst.push(x.innerHTML);
        });
        let month_num = lst.indexOf(data.month) + 1;
        if (month_num === 0) {
            alert('Please enter a valid month for the third question.');
            flag = true;
        }
        return month_num;
    };
    
    const rand_range = (min,max) => {
        return Math.floor(Math.random()*(max-min))+min;
    }

    const special_chars = '`~!@#$%^&*()_+-={}[]\\|;\':"<>,.?/'.split('');
    const mini_special_chars = '!@#$%&*=+?'.split('');
    const super_special_chars = '¡™£¢∞§¶•ªºœ∑´®†¥πåß∂ƒ©∆˚¬…≈ç√∫µ≤≥÷æ«'.split('');
    let month_num = find_num();
    let flag = false;
    let password;
    switch (data.secureness) {
        case ('1'):
            password = data.animal+data.month.slice(0,3)+data.num;
            break;
        case ('2'):
            password = data.animal+data.month.slice(0,3)+(data.num+month_num)*rand_range(10,20)+'!';
            break;
        case ('3'):
            let str = '';
            for (let i=0; i<3; i++) {
                str += data.month[i];
                console.log(data.num+i)
                console.log((data.num+i)%10)
                str += mini_special_chars[(data.num+i)%mini_special_chars.length];
            };
            password = data.animal+str+data.num;
            break;
        case ('4'):
            let str1 = '';
            for (let i=0; i<3; i++) {
                str1 += data.animal.charCodeAt(i);
                str1 += special_chars[(data.num*(i+1))%special_chars.length];
                str1 += special_chars[(month_num*(i+1))%special_chars.length];
            };
            password = data.animal.slice(0,3)+str1;
            break;
        case ('5'):
            let str2 = '';
            for (let i=0; i<12; i++) {
                str2 += String.fromCharCode((data.animal.charCodeAt(i%data.animal.length)+data.month.charCodeAt(i%data.month.length))/2);
                str2 += special_chars[Math.floor(data.num*(i+1)*(i+1)*Math.PI)%special_chars.length];
                str2 += super_special_chars[Math.floor(month_num*(i+1)*(i+1)*Math.E)%super_special_chars.length];
            };
            password = str2;
            break;
    };

    if (flag) {
        return
    };
    post_password(password)
});