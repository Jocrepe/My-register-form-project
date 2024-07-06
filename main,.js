const validateData = (userData) => {
    let errors = 0
    if (!userData.firstname || !userData.lastname || !userData.gender || !userData.email || !userData.description)
        {
            errors += 1
        }
 
    return errors
}

const submitData = async () => { 
    let firstnameDOM = document.querySelector('input[name=firstname]')
    let lastnameDOM = document.querySelector('input[name=lastname]')
    let emailDOM = document.querySelector('input[name=email]')
    let genderDOM = document.querySelector('input[name=gender]:checked') || {}
    let descriptionDOM = document.querySelector('textarea[name=description]')
    let messageDOM = document.getElementById('message')

    try {
        let userData = {
            firstname : firstnameDOM.value,
            lastname : lastnameDOM.value,
            gender : genderDOM.value,
            email : emailDOM.value,
            description : descriptionDOM.value
        }

        let errors = validateData(userData)

        if (errors > 0)
            {
                throw {
                    message: 'กรอกข้อมูลไม่ครบถ้วน',
                    error: errors
                }
            }
    
        const response = await axios.post('http://localhost:8000/user', userData)
        console.log('submitted successfully')

        messageDOM.textContent = 'Register Complete!'
        messageDOM.className = 'message success'

    } catch (error) {
        console.log(error.message)



        messageDOM.textContent = 'Incomplete information filled in'
        messageDOM.className = 'message danger';
    }
}