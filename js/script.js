const
  tabTabs = document.querySelectorAll('.tabs .tab'),
  tabItemsContent = document.querySelectorAll('.tabs-items .tab-item'),
  tabsDigits = document.querySelectorAll('.tabs'),
  counterOfNumber = document.querySelectorAll('.counters__number');

let
  tabName,
  itemName,
  firstNumber = document.querySelectorAll('.first-number'),
  secondNumber = document.querySelectorAll('.second-number'),
  solvedTask = document.querySelectorAll('.solved-task'),
  input = document.querySelectorAll('.input'),
  button = document.querySelectorAll('.button'),
  messege = document.querySelectorAll('.messege-result'),
  tabContent = document.querySelectorAll('.simulator'),
  arrMessegeTrue = [
    'Гениально!',
    'Прекрасно!',
    'Умница!',
    'Хорошо!',
    'Браво!',
    'Талант!',
    'Отлично!',
    'Так держать!',
    'Блестяще!',
    'Великолепно!',
    'Молодец!',
    'Да!',
    'Супер!',
    'Верно!',
    'Правильно!',
  ],
  arrMessegeFalse = [
    'Неверно!',
    'Попробуй ещё!',
    'Не сдавайся!',
    'В следующий раз получится!',
    'Подумай как следует!',
  ];

// Выбор: умножение или деление
for (let i = 0; i < 2; i++) {
  tabTabs[0].click();
  tabTabs[i].onclick = function () {
    tabTabs.forEach(function (item) {
      item.classList.remove('is-active');
    });
    this.classList.add('is-active');
    tabName = this.getAttribute('data-tab');

    // Выбираем циферный блок для умножения или деления
    tabsDigits.forEach(function (item) {
      if (item.classList.contains(tabName)) {
        item.classList.add('is-number-active');
      }
      else {
        item.classList.remove('is-number-active');
      }
    });

    tabItemsContent.forEach(function (item) {
      if (item.classList.contains(tabName)) {
        item.classList.add('is-active');
      }
      else {
        item.classList.remove('is-active');
      }
    });

    // Выбираем умножать или делить
    for (let i = 2; i < tabTabs.length; i++) {
      tabTabs[i].onclick = function () {
        tabTabs.forEach(function (item) {
          item.classList.remove('is-number-active')
        });
        this.classList.add('is-number-active');
        digitName = +this.getAttribute('data-item');

        // Случайное число для умножения
        function randomNumberMultiplication() {
          return Math.floor(Math.random() * 10) + 1;
        }
        let randomNumberForMultiplicationAll = randomNumberMultiplication(),
          randomNumberForMultiplication = randomNumberMultiplication();

        // Подстановка статичного и случайного множителя в задачу
        function digitOutputMultiplication(tabName, digitName) {
          if (tabName === 'multiplication') {
            firstNumber[0].textContent = digitName;
            secondNumber[0].textContent = randomNumberForMultiplication;
          }
        }

        // Подстановка случайного множителя в задачу для всей таблицы
        function digitOutputMultiplicationAll(tabName, digitName) {
          if (tabName === 'multiplication' && digitName === 11) {
            firstNumber[0].textContent = randomNumberForMultiplicationAll;
          }
        }

        // Выполняем умножение
        function miltiplication() {
          digitOutputMultiplication(tabName, digitName);
          digitOutputMultiplicationAll(tabName, digitName);

          if (digitName === 11) {
            return randomNumberForMultiplicationAll * randomNumberForMultiplication;
          }
          else {
            return digitName * randomNumberForMultiplication;
          }
        }
        let multiplicationResult = miltiplication();

        //Кнопка "проверка" ответа на умножение
        button[0].onclick = function () {
          let userAnswerMultiplication = +input[0].value;
          outputMessageMultiplication(userAnswerMultiplication);
          input[0].value = '';
          multiplicationResult = miltiplication();
        }

        // Вывод сообщения и примера с ответом на умножение
        function outputMessageMultiplication(userAnswerMultiplication) {
          let messegeTrue = arrMessegeTrue[Math.floor(Math.random() * arrMessegeTrue.length)],
            messegeFalse = arrMessegeFalse[Math.floor(Math.random() * arrMessegeFalse.length)];

          if (digitName === 11) {
            solvedTask[0].innerHTML = `${randomNumberForMultiplicationAll} * ${randomNumberForMultiplication} = ${randomNumberForMultiplicationAll * randomNumberForMultiplication}`;
          }
          else {
            solvedTask[0].innerHTML = `${digitName} * ${randomNumberForMultiplication} = ${digitName * randomNumberForMultiplication}`;
          }

          if (userAnswerMultiplication === multiplicationResult) {
            countProperly[i]++;
            countScore[i]++;
            messege[0].style.color = '#333333';
            solvedTask[0].style.color = '#333333';
            messege[0].textContent = messegeTrue;
            randomNumberForMultiplicationAll = randomNumberMultiplication();
            randomNumberForMultiplication = randomNumberMultiplication();
          }
          else {
            countWrong[i]++;
            countScore[i]--;
            messege[0].style.color = '#E76868';
            solvedTask[0].style.color = '#E76868';
            messege[0].textContent = messegeFalse;
          }
          counterOfNumber[0].textContent = countProperly[i];
          counterOfNumber[1].textContent = countWrong[i];
          counterOfNumber[2].textContent = countScore[i];
        }

        // Создаем массив кратных чисел для выбранного числа
        function multiple(num) {
          let arr = [];
          for (let i = 1; i <= 10; i++) {
            arr.push(num * i);
          }
          return arr;
        }

        // Случайное число для деления
        function randomNumberDivision(array) {
          return array[Math.floor(Math.random() * array.length)];
        }

        let arrayOfMultiples = multiple(digitName),
          randomNumberForDivision = randomNumberDivision(arrayOfMultiples),
          arrayOfMultiplesAll = multiple(randomNumberForMultiplication),
          randomNumberForDivisionAll = randomNumberDivision(arrayOfMultiplesAll);


        // Подстановка случайного делимого и статичного делителя в задачу
        function digitOutputDividing(tabName, digitName) {
          if (tabName === 'dividing') {
            firstNumber[1].textContent = randomNumberForDivision;
            secondNumber[1].textContent = digitName;
          }
        }

        // Подстановка случайного делителя в задачу для всей таблицы
        function digitOutputDividingAll(tabName, digitName) {
          if (tabName === 'dividing' && digitName === 11) {
            firstNumber[1].textContent = randomNumberForDivisionAll;
            secondNumber[1].textContent = randomNumberForMultiplication;
          }
        }

        // Выполняем деление
        function dividing() {
          digitOutputDividing(tabName, digitName);
          digitOutputDividingAll(tabName, digitName);
          if (digitName === 11) {
            return randomNumberForDivisionAll / randomNumberForMultiplication;
          }
          else {
            return randomNumberForDivision / digitName;
          }
        }
        let divisionResult = dividing();

        //Кнопка "проверка" ответа на деление
        button[1].onclick = function () {
          let userAnswerDivision = +input[1].value;
          outputMessageDivision(userAnswerDivision);
          input[1].value = '';
          divisionResult = dividing();
        }

        // Вывод сообщения и примера с ответом на деление
        function outputMessageDivision(userAnswerDivision) {
          let messegeTrue = arrMessegeTrue[Math.floor(Math.random() * arrMessegeTrue.length)],
            messegeFalse = arrMessegeFalse[Math.floor(Math.random() * arrMessegeFalse.length)];

          if (digitName === 11) {
            solvedTask[1].innerHTML = `${randomNumberForDivisionAll} / ${randomNumberForMultiplication} = ${randomNumberForDivisionAll / randomNumberForMultiplication}`;
          }
          else {
            solvedTask[1].innerHTML = `${randomNumberForDivision} / ${digitName} = ${randomNumberForDivision / digitName}`;
          }

          if (userAnswerDivision === divisionResult) {
            countProperly[i]++;
            countScore[i]++;
            messege[1].style.color = '#333333';
            solvedTask[1].style.color = '#333333';
            messege[1].textContent = messegeTrue;
            randomNumberForDivision = randomNumberDivision(arrayOfMultiples);
            randomNumberForMultiplication = randomNumberMultiplication();
            arrayOfMultiplesAll = multiple(randomNumberForMultiplication);
            randomNumberForDivisionAll = randomNumberDivision(arrayOfMultiplesAll);
          }
          else {
            countWrong[i]++;
            countScore[i]--;
            messege[1].style.color = '#E76868';
            solvedTask[1].style.color = '#E76868';
            messege[1].textContent = messegeFalse;
          }
          counterOfNumber[3].textContent = countProperly[i];
          counterOfNumber[4].textContent = countWrong[i];
          counterOfNumber[5].textContent = countScore[i];
        }
      }
    }
  }
  // Переменные для подсчета правильных и неправильных ответов + подсчет очков
  let countProperly = [],
    countWrong = [],
    countScore = [];

  // Создаем массив значений для подсчета правильных ответов
  function countProperlyArr() {
    for (let i = 0; i < tabTabs.length; i++) {
      countProperly.push(0);
    }
    return countProperly;
  }
  countProperly = countProperlyArr();

  // Создаем массив значений для подсчета неправильных ответов
  function countWrongArr() {
    for (let i = 0; i < tabTabs.length; i++) {
      countWrong.push(0);
    }
    return countWrong;
  }
  countWrong = countWrongArr();

  // Создаем массив значений для подсчета очков
  function countScoreArr() {
    for (let i = 0; i < tabTabs.length; i++) {
      countScore.push(0);
    }
    return countScore;
  }
  countScore = countScoreArr();
}
















































