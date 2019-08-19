import validator from 'validator'

const isMilistoneName = (milistoneName)=>{
    const result = validator.isEmpty(milistoneName)
    return result;
}
const isDate = (startDate, endDate)=>{
    const start = validator.isEmpty(startDate);
    const end = validator.isEmpty(endDate)
    if(start == true && end == true){
        return true
    }
    return false
}
export default{
    isMilistoneName,
    isDate
}