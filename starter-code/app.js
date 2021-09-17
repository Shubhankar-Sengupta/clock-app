//selecting elements

const getQuote = document.querySelector('.quote-area');
const author = document.querySelector('.author');
const refreshButton = document.querySelector('.refresh-button');
const myCollapsible = document.querySelector('.sec-collapsible');
const quoteArea = document.querySelector('.main-quote');
const time = document.querySelector('.time');
const std_time = document.querySelector('.time-standard');
const zone_time = document.querySelector('.destination-f');
const time_slot_day = document.querySelector('.time-slot');
const imgSvg = document.querySelector('.icon-chg');
const backgroundImg = document.querySelector('.bkgnd');
const arrow_icon = document.querySelector('.arrow-icon');
const footer_info = document.querySelectorAll('.info');
const mainQuote = document.querySelector('.quote-area');
const shown = document.querySelector('.shown');
const hidden = document.querySelector('.hidden');
const sec_container = document.querySelector('.container');
const inside_sec_div = document.querySelector('.second-interface');


// manipulating elements

async function quoteRandom() {
    const info = await axios.get(`https://api.quotable.io/random`);
    getQuote.innerHTML = `${info.data.content}`;
    author.innerHTML = `-${info.data.author}`;
    mainQuote.classList.add('quotes');
}


refreshButton.addEventListener('click', quoteRandom);


myCollapsible.addEventListener('show.bs.collapse', (evt) => {
    myCollapsible.style.transition = `all .75s ease-out`;
    quoteArea.style.display = `none`;
    arrow_icon.classList.add('rotate-full');
    shown.style.display =`none`;
    hidden.style.display = `inline`;
    sec_container.style.position = `absolute`;
    sec_container.style.bottom = `12rem`;
    sec_container.style.right = `0px`;
    sec_container.style.left = `0px`;
    inside_sec_div.style.height = `280px`;
})


myCollapsible.addEventListener('hide.bs.collapse', (evt) => {
    myCollapsible.style.transition = `all .75s ease-out`;
    quoteArea.style.display = `grid`;
    arrow_icon.classList.remove('rotate-full');
    shown.style.display =`inline`;
    hidden.style.display = `none`;
    sec_container.style.position = `static`;
})


window.onload = async (evt) => {

    const newDate = new Date();
    const hrs = newDate.getHours();

    if (hrs >= 5 && hrs < 12) {
        time_slot_day.innerHTML = `morning`;
    }

    else if (hrs >= 12 && hrs <= 17) {
        time_slot_day.innerHTML = `afternoon`;
    }

    else {
        time_slot_day.innerHTML = `evening`;
        imgSvg.src = `./assets/desktop/icon-moon.svg`;
        backgroundImg.classList.add('bkgnd-2');
        backgroundImg.classList.remove('bkgnd');
        myCollapsible.style.color = `var(--color-white)`;
        myCollapsible.style.backgroundColor = `var(--color--black-2)`;
        inside_sec_div.style.color = `inherit`;
        inside_sec_div.style.backgroundColor = `inherit`;
        inside_sec_div.style.backdropFilter = `blur(40.7742px)`;
    }

    const time_info = await axios.get('http://worldtimeapi.org/api/ip');
    const set_city_time = await axios.get('https://freegeoip.app/json/');


    function setInfo({ data }, data_obj_2) {

        const info = data_obj_2;

        function secondary({ data }) {
            zone_time.innerHTML = `in ${data.city},${data.country_name}`;
        }

        secondary(info);

        const [day_time, tm_std] = [data.datetime, data.abbreviation];
        const current_Time = day_time.slice(11, 16);
        const [current_zone, day_of_week, day_of_year, week_no] = footer_info;

        time.innerHTML = current_Time;
        std_time.innerHTML = tm_std;


        function trail(...objects) { // rest parameters

            function trail2([first, second, third, fourth], { data }) { // destructuring array and object.

                const object = {

                    zonal: data.timezone,
                    week_day: data.day_of_week,
                    year_day: data.day_of_year,
                    week_num: data.week_number,

                    draw(object, description) {
                        object.innerHTML = description;
                    },

                    inner() {
                        const { zonal, week_day, year_day, week_num } = this; // this refers to the object.
                        this.draw(first, zonal);
                        this.draw(second, week_day);
                        this.draw(third, year_day);
                        this.draw(fourth, week_num);
                    }
                }

                object.inner();

            }

            trail2(objects, time_info);
        }

        trail(current_zone, day_of_week, day_of_year, week_no, time, std_time);

    }

    setInfo(time_info, set_city_time);
};





