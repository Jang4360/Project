export function getDay(){
    const day= String(new Date().getDay()).padStart(2,"0")
    const month= String(new Date().getMonth()+1).padStart(2,"0")
    const year= new Date().getFullYear()
    const today= year+'-'+month+'-'+day
    return today
}