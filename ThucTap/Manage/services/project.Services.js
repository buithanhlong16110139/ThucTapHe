import validator from 'validator'

const isProjectName = (projectName)=>{
    const result = validator.isEmpty(projectName)
    return result;
}
export default{
    isProjectName
}