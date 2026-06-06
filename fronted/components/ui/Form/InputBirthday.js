import styles from "./InputBirthday.module.css";

import {useState} from "react";

// Constantes e dados estáticos
const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1900;

const months = [
    {name: "Janeiro", days: 31},
    {name: "Fevereiro", days: 28},
    {name: "Março", days: 31},
    {name: "Abril", days: 30},
    {name: "Maio", days: 31},
    {name: "Junho", days: 30},
    {name: "Julho", days: 31},
    {name: "Agosto", days: 31},
    {name: "Setembro", days: 30},
    {name: "Outubro", days: 31},
    {name: "Novembro", days: 30},
    {name: "Dezembro", days: 31},
];
const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
const generateDays = (daysInMonth) => Array.from({length: daysInMonth}, (_, i) => i + 1);


const yearsOptions = Array.from({length: CURRENT_YEAR - MIN_YEAR + 1}, (_, i) => CURRENT_YEAR - i);



function InputBirthday() {
    const [date, setDate] = useState({
        year: CURRENT_YEAR,
        month: "Janeiro",
        days: generateDays(31)
    });

    function onDataChange({e, year = false}) {
        if (year) {
            const selectedYear = e.target.value;
            let days = date.days;
            if (date.month === "Fevereiro") {
                const daysInMonth = isLeapYear(parseInt(selectedYear)) ? 29 : 28;
                days = generateDays(daysInMonth);
            }
            setDate(prev => ({...prev, days: days, year: parseInt(selectedYear)}));
        } else {
            const month = e.target.value;
            let daysInMonth = months.filter((d) => d.name === month);

            if (month.toLowerCase() === "fevereiro" && isLeapYear(date.year)) {
                daysInMonth = daysInMonth[0].days + 1;
            } else {
                daysInMonth = daysInMonth[0].days;
            }

            setDate(prev => ({...prev, month: month, days: generateDays(daysInMonth)}));
        }
    }

    return (
        <div className={styles.birthdayGroup}>
            <p className={styles.formLabel}>Data de nascimento</p>
            <div className={styles.birthdayForm}>
                <select className={styles.formField}>
                    {date.days.map((day, i) => (
                        <option key={i}>{day}</option>
                    ))}
                </select>
                <select className={styles.formField} onChange={(e) => onDataChange({e})}>
                    {months.map((date, i) => (
                        <option key={i}>{date.name}</option>
                    ))}
                </select>
                <select className={styles.formField} onChange={(e) => onDataChange({e, year: true})}>
                    {yearsOptions.map((year, i) => (
                        <option key={i}>{year}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBirthday;