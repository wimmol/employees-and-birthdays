import './BirthdayList.css'

function getRandomColor() {
    const which = Math.floor(Math.random() * 3)
    const a = [Math.floor(Math.random() * 30) + 220, Math.floor(Math.random() * 30) + 220, 255]
    return '#' + a[which % 3].toString(16) + a[(which+1) % 3].toString(16) + a[(which+2) % 3].toString(16)
}


const monthColors = []
for (let i = 0; i < 12; i++) monthColors.push(getRandomColor())

function BirthdayList({actives}) {
    if (actives.length === 0)
        return (<div className="birthday-list">
            <h2>Birthdays</h2>
            <div className="birthday-list__month">
                <p className="birthday-list__empty">Employees List is empty</p>
            </div>
        </div>)
    const months = 'November December January February March April May June July August September October'.split(' ')
    actives = actives.sort((a, b) => a.lastName > b.lastName ? 1 : -1)
    const list = months.map((month, index) =>
        actives
            .filter(employee => {
                const monthNum = (Number.parseInt(employee.dob.split('-')[1]) + 1) % 12
                return monthNum === index ? 1 : 0
            })
            .map(employee => {
                const day = Number.parseInt(employee.dob.split('-')[2])
                const year = Number.parseInt(employee.dob.split('-')[0])
                return (
                        <p key={employee.id} className="birthday-list__employee">
                            <span className="employee__name">{employee.firstName + ' ' + employee.lastName}</span>
                            {' - ' + day + ' ' + month + ', ' + year + ' year'}
                        </p>
                )
            }))
        .map(array => {
            if (array.length === 0) {
                return <p className="employee-name">No Employees</p>
            } else {
                return array
            }
        })

    return (
        <div className="birthday-list">
            <h2>Birthdays</h2>
            <div className="birthday-list__months-list">
                {months.map((month, index) =>
                    <div key={month} className="birthday-list__month" style={{backgroundColor: monthColors[index]}}>
                        <p className="birthday-list__month-name">{month}</p>
                        {list[index]}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BirthdayList;
