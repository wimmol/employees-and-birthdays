import './SelectBoard.css'
import {useEffect, useState} from "react";
import EmployeeWithRadio from "./EmployeeWithRadio";

function SelectBoard({actives, setActives}) {
    const [employees, setEmployees] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    function addActive(employee) {
        setActives([...actives, employee])
    }
    function removeActive(employee) {
        setActives(actives.filter(e => e.id !== employee.id))
    }
    function isActive(employee) {
        return actives.find(e => e.id === employee.id) ? 1 : 0
    }

    useEffect(() => {
        fetch('https://yalantis-react-school-api.yalantis.com/api/task0/users')
            .then(response => {
                if (response.ok) {
                    console.log('response ok')
                    return response.json()
                } else {
                    throw response
                }
            })
            .then(response => {
                setEmployees(response.sort((a, b) => a.firstName > b.firstName ? 1 : -1))
            })
            .catch(error => {
                console.log('Error fetching:', error)
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading)
        return (
            <div className="select-board">
                <p>Loading...</p>
            </div>
        )
    if (error)
        return (
            <div className="select-board">
                <p>Error fetching</p>
                <p>{error}</p>
            </div>
        )

    function toChangeRadio(employee) {
        if (isActive(employee)) {
            removeActive(employee)
        } else {
            addActive(employee)
        }
    }

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')

    return (
        <div className="select-board">
            <h2>Employees</h2>
            <div className="select-board__latter-list">
                {alphabet.map(latter => {
                    const currentEmployees = employees.filter(employee => employee.firstName[0].toUpperCase() === latter)
                    if (currentEmployees.length === 0) {
                        return (
                            <div className="select-board__latter" key={latter}>
                                <p className="select-board__latter-symbol">{latter}</p>
                                <p className="employee-name">No Employees</p>
                            </div>)
                    }
                    return (<div className="select-board__latter" key={latter}>
                        <p className="select-board__latter-symbol">{latter}</p>
                        {currentEmployees.map(employee => <EmployeeWithRadio
                            key={employee.id}
                            condition={isActive(employee)}
                            employee={employee}
                            toChangeRadio={toChangeRadio}
                        />)}
                    </div>)
                })}
            </div>
        </div>
    );
}

export default SelectBoard
