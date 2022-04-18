const { format, getDay} = require('date-fns'); 
const dayOfWeekMap = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];

export function getDayOfWeek(date) {
  const dayWeek = new Date(date).getDay();
  return dayOfWeekMap[dayWeek];
}

export function getDate(date) {
  const newDate = date.slice(0, 10).split('-').reverse().join('/');
  return newDate;
}

export function getDateEdit(date1) {
  //2022-04-25T00:00:00.000Z
  const formatDate = date1.slice(0,10);
  return formatDate;
 }


export function totalEntries(values) {
  const reduce = values.reduce ((accumulator,value) => {
     if(value.tipo === 'entrada') {
       return accumulator + (value.valor);
     }
     return accumulator;
     
   },0)
   return reduce;
 }

 export function totalOut (values) {
   const reduce = values.reduce ((accumulator,value) => {
     if(value.tipo === 'saida') {
       return accumulator + (value.valor);
     }
     return accumulator;
   },0)
   return reduce;
 }

 
