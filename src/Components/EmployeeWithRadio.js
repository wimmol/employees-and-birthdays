import {useState} from "react";

function EmployeeWithRadio({condition, employee, toChangeRadio}) {
    const [isActive, setIsActive] = useState(condition)
    function toChangeСondition(employee) {
        toChangeRadio(employee)
        setIsActive(!isActive)
    }
    //console.log(condition)
    return (
        <div className={"employee" + (isActive ? " active" : "")} key={employee.id}>
            <p className="employee__name">{employee.firstName + ' ' + employee.lastName}</p>
            <form className="employee__form">
                <label className="label-na">
                    <input type="radio"
                           value="false"
                           checked={!isActive}
                           onChange={() => toChangeСondition(employee)}
                    />
                    not active
                </label>
                <label  className="label-a">
                    <input type="radio"
                           value="true"
                           checked={isActive}
                           onChange={() => toChangeСondition(employee)}
                    />
                    active
                </label>
            </form>
        </div>
    )
}

export default EmployeeWithRadio;