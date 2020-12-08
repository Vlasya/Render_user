// import Student from './students.js'



// Основные роли Юзеров
let roles = {
	student: (data) => new Student(data),
	admin: (data) => new Admin(data),
	lector: (data) => new Lector(data),
}

// Основной блок
let renderWrapper = document.querySelector('.wrapper')

//Основной класс
class User {
	constructor(options) {
		this.age = options.age,
			this.courses = options.courses,
			this.img = options.img,
			this.name = options.name,
			this.role = options.role
	}
	// Рисуем юзера
	static renderUser(data) {

		// Создаем блоки 

		// карточка юзера
		let userCard = document.createElement('div');
		userCard.classList.add('userCard');
		renderWrapper.append(userCard)
		// инфо-блок
		let userInfo = document.createElement('div');
		userInfo.classList.add('userInfo')
		userCard.append(userInfo)

		let personalUserInfo = document.createElement('div');
		personalUserInfo.classList.add('personalUserInfo')
		userInfo.append(personalUserInfo);

		let nameUser = document.createElement('div');
		nameUser.classList.add('nameUser')
		personalUserInfo.append(nameUser)

		// Проходимся по data,который получили и отрисовываем общие блоки для всех классов
		for (let key in data) {
			// если есть такой ключ и он не пустой
			if (key === 'img' && data[key] !== undefined) {
				let img = document.createElement('img');
				img.classList.add('userImg')
				img.src = `${data[key]}`
				personalUserInfo.prepend(img)
			} else if (key === 'name' && data[key] !== undefined) {
				let name = document.createElement('div');
				name.innerHTML = `Name: ${data[key]}`
				nameUser.prepend(name)
			} else if (key === 'age' && data[key] !== undefined) {
				let age = document.createElement('div');;
				age.innerHTML = `Age: ${data[key]}`
				nameUser.append(age)
			} else if (key === 'role' && data[key] !== undefined) {

				let roleClass = 'role'
				let role = document.createElement('div');;
				role.innerHTML = `${data[key]}`;
				role.classList.add(`${roleClass}`)
				userInfo.append(role)
			} else if (key === 'courses' && data[key] !== undefined) {
				let coursesBlock = document.createElement('div');
				coursesBlock.classList.add('coursesBlock');
				userCard.append(coursesBlock)
			}
		}
	}

	// Отрисовываем иконки роли
	static getIconRole(dataicon) {
		let iconRole = document.createElement('img');
		let iconSt = dataicon;
		let userRole = document.querySelectorAll('.role')
		userRole.forEach(item => {
			iconRole.classList.add('iconImg');
			if (typeof iconSt !== 'object') {
				iconRole.src = `${iconSt}`;
				item.prepend(iconRole)
			}
		})
	}

	static getScore(value){
		if(value>=0 &&value<=20){
			return `<p class='satisfactory'>Satisfactory</p>`
		}else
		if(value>=21 &&value<=55){
			return `<p class='good'>Good</p>`
		}else
		if(value>=56 &&value<=85){
			return `<p class='very'>Very Good</p>`
		}else
		if(value>=86 &&value<=100){
			return `<p class='excellent'>Excellent</p>`
		}
	}
}

// Класс Студент
class Student extends User {
	constructor(options) {
		super(options)
	}

	static renderUser(data) {
		super.renderUser(data);
		for (let key in data) {

			if (key === 'role' && data[key] !== undefined) {
				let studentRole = 'studentRole';
				let studRole = document.querySelectorAll('.role')
				studRole.forEach(item => {
					item.classList.add(`${studentRole}`)
				})
			}
			 else if (key === 'courses' && data[key] !== undefined) {
				// Находим все блоки курсов у  Студентов
				let studCourse = document.querySelectorAll('.coursesBlock');
				// курсы юзера из data
				let coursData = data[key];
				coursData.forEach(course => {
					// блок отдельного курса
					let cours = document.createElement('div');
					cours.classList.add('course')
					cours.classList.add('studentRole')
					// название
					let nameCourse = document.createElement('p')
					nameCourse.innerHTML = `${course.title}`
					// баллы
					let scoreCourse = document.createElement('p')
					scoreCourse.innerHTML = `${Student.getScore(course.mark)}`
					cours.append(scoreCourse)
					cours.prepend(nameCourse)
					studCourse.forEach(item => {
						item.append(cours)
					})
				})
			}
		}
	}

}


class Admin extends User {
	constructor(options) {
		super(options)
	}
	static renderUser(data) {
		super.renderUser(data)
		for (let key in data) {
			if (key === 'role'&& data[key] !== undefined) {
				let AdminRole = 'adminRole';
				let AdRole = document.querySelectorAll('.role')
				AdRole.forEach(item => {
					item.classList.add(`${AdminRole}`)
				})
			}
			else if (key === 'courses' && data[key] !== undefined) {
				// Находим все блоки курсов у  Студентов
				let studCourse = document.querySelectorAll('.coursesBlock');
				// курсы юзера из data
				let coursData = data[key];

				coursData.forEach(course => {
					// блок отдельного курса
					let cours = document.createElement('div');
					cours.classList.add('adminCourse')
					cours.classList.add('adminRole')
					// название
					let nameCourse = document.createElement('p')
					nameCourse.innerHTML = ` Title: ${course.title}`
					// баллы
					let scoreCourse = document.createElement('p')
					scoreCourse.innerHTML = `Admin's score: ${Admin.getScore(course.score)} `
					let lector= document.createElement('p')
					lector.innerHTML =`Lector: ${course.lector}`

					cours.append(scoreCourse)
					cours.prepend(nameCourse)
					cours.append(lector)
					studCourse.forEach(item => {
						item.append(cours)
					})
				})
			}

		}
	}

}


class Lector extends User {
	constructor(options) {
		super(options)
	}
	static renderUser(data) {
		super.renderUser(data)
		for (let key in data) {
			if (key === 'role') {
				let LectorRole = 'lectorRole';
				let lecRole = document.querySelectorAll('.role')
				lecRole.forEach(item => {
					item.classList.add(`${LectorRole}`)
				})
			}
			else if (key === 'courses' && data[key] !== undefined) {
				// Находим все блоки курсов у  Студентов
				let studCourse = document.querySelectorAll('.coursesBlock');
				// курсы юзера из data
				let coursData = data[key];

				coursData.forEach(course => {
					// блок отдельного курса
					let cours = document.createElement('div');
					cours.classList.add('adminCourse')
					cours.classList.add('lectorRole')
					// название
					let nameCourse = document.createElement('p')
					nameCourse.innerHTML = ` Title: ${course.title}`
					// баллы
					let scoreCourse = document.createElement('p')
					scoreCourse.innerHTML = `Lector's score: ${Lector.getScore(course.score)}`
					let lector= document.createElement('p')
					lector.innerHTML =`Average student's score: ${Lector.getScore(course.studentsScore)}`

					cours.append(scoreCourse)
					cours.prepend(nameCourse)
					cours.append(lector)
					studCourse.forEach(item => {
						item.append(cours)
					})
				})
			}


		}
	}

}
// Получаем файл
async function getData() {

	let data = await fetch('data.json');
	if (data.ok) {
		let usersData = await data.json()

		createUser(usersData)
		return usersData
	}
}

// Создаем экземпляры классов и вызываем к каждому экзепляру свой рендер
function createUser(data) {
	data.users.forEach(user => {
		if (roles[user.role]) {
			let newUser = roles[user.role](user);

			if (newUser instanceof Student) {
				Student.renderUser(newUser);
				for (let key in data.roles) {
					// Находим иконку для данной роли
					if (user.role === key) {
						let icon = data.roles[key];
						Student.getIconRole(icon)
					}
				}
				Student.getIconRole(data)
			} else if (newUser instanceof Admin) {
				Admin.renderUser(newUser)
				for (let key in data.roles) {
					// Находим иконку для данной роли
					if (user.role === key) {
						let icon = data.roles[key];
						Admin.getIconRole(icon)
					}
				}
			} else if (newUser instanceof Lector) {
				Lector.renderUser(newUser);
				for (let key in data.roles) {
					// Находим иконку для данной роли
					if (user.role === key) {
						let icon = data.roles[key];
						Lector.getIconRole(icon)
					}
				}
			}
		}
	})
}

// Цепляемся к кнопочке
let getUserBtn = document.querySelector('#btn');
getUserBtn.addEventListener('click', render);


// Очищаем блок без запросом
function render(e) {
	renderWrapper.innerHTML = ''
	getData()
}
