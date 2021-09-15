var app = new Vue({
    el: '#app',
    data: { 
        // inputs
        filterBy: 0,
        inputTwo: 0,
        inputThree: 0,
        inputFour: 0,
        inputFive: 0,
        inputSix: 0,
        inputSeven: 0,
        inputEight: 0,
        inputNine: 0,
        inputTen: 0,
        inputEleven: 0,
        inputTwelve: 0,

        // datos de ingreso
        titleEntered: null,
        passwordEntered: null,
        employeeCode: null,
        baseSalary: null,
        // salarios
        secretarySalary: 0,
        vendedorSalary: 0,
        ensambladorSalary: 0,
        // metricas de ensamblaje
        zapatosMaxEnsamblar: 0,
        zapatillasMaxEnsamblar: 0,
        // precios de ensamblaje
        precioEnsambleZapatos: 0,
        precioEnsambleZapatillas: 0,
        // comision por ventas  
        comisionVentas: 0,

        formShow: 0,
        // form Data
        secretaryHrsExtra: 0,
        secretarioArray: [],
        
        salesmanSales: 0,
        vendedorFinalSalary: 0,
        salesmanArray: [],

        ensambleManHrsExtra: 0,
        zapatosEnsamblados: 0,
        zapatillasEnsamblados: 0,
        hijosEnsamblador: 0,
        bonoHijos: 0,
       
        ensambleManArray: [],

      

    },

    methods: {

        login: function() {
            this.formShow = 0,
            this.clearScreen()
            
            if (this.titleEntered.toLowerCase() == 'administrador' && this.passwordEntered == 1234) {
                this.employeeCode = 1
            } else if (this.titleEntered.toLowerCase() == 'secretario' && this.passwordEntered == 1234) {
                this.employeeCode = 2
            } else if (this.titleEntered.toLowerCase() == 'vendedor' && this.passwordEntered == 1234) {
                this.employeeCode = 3
            } else if (this.titleEntered.toLowerCase() == 'ensamblador' && this.passwordEntered == 1234) {
                this.employeeCode = 4
            } else {
                this.employeeCode = 0
                console.log('login failed')
                const text = document.createElement('h4')
                text.textContent = 'El cargo o la contraseña es incorrecta. Por favor intentalo de nuevo.'
                document.querySelector('#error').appendChild(text)
            }
        
        },

        exit: function() {
            this.employeeCode = 0
            this.formShow = 0
        },

        clearScreen: function() {
            const noText = document.createElement('h4')
            noText.textContent = ''
            document.querySelector('#error').innerHTML = ''
        },


        renderData: function() {
            if ((this.filterBy === 1) && (this.baseSalary !== 0 || this.baseSalary !== '')) {
                this.secretarySalary = this.baseSalary
                // console.log(this.secretarySalary)
            } else if (this.filterBy === 2 && (this.baseSalary !== 0 || this.baseSalary !== '')) {
                this.vendedorSalary = this.baseSalary
                // console.log(this.vendedorSalary)
            } else if (this.filterBy === 3 && (this.baseSalary !== 0 || this.baseSalary !== '')) {
                this.ensambladorSalary = this.baseSalary
                // console.log(this.ensambladorSalary)
            }

            this.inputTwo !== 0 && this.inputTwo !== '' ? this.zapatosMaxEnsamblar = this.inputTwo : undefined
            this.inputThree !== 0 && this.inputThree !== '' ? this.zapatillasMaxEnsamblar = this.inputThree : undefined
            this.inputFour !== 0 && this.inputFour !== '' ? this.precioEnsambleZapatos = this.inputFour : undefined
            this.inputFive !== 0 && this.inputFive !== '' ? this.precioEnsambleZapatillas = this.inputFive : undefined
            this.inputSix !== 0 && this.inputSix !== '' ? this.comisionVentas = this.inputSix : undefined

           
            // console.log(this.zapatosMaxEnsamblar)
            // console.log(this.zapatillasMaxEnsamblar)
            // console.log(this.precioEnsambleZapatos)
            // console.log(this.precioEnsambleZapatillas)
            // console.log(this.comisionVentas)
        },

        secretaryWage: function() {
            this.formShow = 1,
            this.secretaryHrsExtra = this.inputSeven
            this.secretarioArray.push({
                cargo: 'Secretario',
                salario_base: this.formatNumber(this.secretarySalary),
                valorHora: this.formatNumber(this.findHourRate(this.secretarySalary)),
                horasExtra: this.secretaryHrsExtra,
                valorHoraExtra: this.formatNumber(this.findHourRate(this.secretarySalary) * 1.8),
                total: this.formatNumber(this.secretarySalary + (this.findHourRate(this.secretarySalary) * 1.8) * this.secretaryHrsExtra)
            })
        },

        salesmanWage: function () {
            this.formShow = 2,
            this.salesmanSales = this.inputEight
            this.salesmanSales > 5000000 ? this.vendedorFinalSalary = this.vendedorSalary * 1.1 : this.vendedorFinalSalary = this.vendedorSalary
            this.salesmanSales > 10000000 ? this.vendedorFinalSalary = this.vendedorSalary * 1.2 : undefined

            this.salesmanArray.push({
                cargo: 'Vendedor',
                salarioBase: this.formatNumber(this.vendedorFinalSalary),
                ventasFacturadas: this.formatNumber(this.salesmanSales),
                comisionVentas: `% ${this.comisionVentas*100}`,
                valorHora: this.formatNumber(this.findHourRate(this.vendedorFinalSalary)),
                subsidioTransporte: this.formatNumber(106454),
                total: this.formatNumber(this.vendedorFinalSalary + (this.comisionVentas * this.salesmanSales) + 106454)
            })

                },

        ensambleWage: function() {
            
            this.formShow = 3
            this.ensambleManHrsExtra = this.inputNine
            this.zapatosEnsamblados = this.inputTen
            this.zapatillasEnsamblados = this.inputEleven
            this.hijosEnsamblador = this.inputTwelve
            
            this.hijosEnsamblador !== 1 ? this.bonoHijos = this.hijosEnsamblador * 60000 : this.bonoHijos = 80000
            let incremento = 0
            let incremento2 = 0
            
            if (this.zapatosEnsamblados <= this.zapatosMaxEnsamblar) {
                this.zapatosEnsamblados > 1000 && this.zapatosEnsamblados > 2000 ? incremento = ((this.zapatosEnsamblados * this.precioEnsambleZapatos) * 0.2) : this.incremento = 0
                this.zapatosEnsamblados > 1000 && this.zapatosEnsamblados < 2000 ? incremento = ((this.zapatosEnsamblados * this.precioEnsambleZapatos) * 0.1) : this.incremento = 0
            }
            
            if (this.zapatillasEnsamblados <= this.zapatillasMaxEnsamblar) {
                this.zapatillasEnsamblados > 1700 && this.zapatillasEnsamblados > 3000 ? incremento2 = ((this.zapatillasEnsamblados * this.precioEnsambleZapatillas) * 0.3) : undefined
                this.zapatillasEnsamblados > 1700 && this.zapatillasEnsamblados <= 3000 ? incremento2 = ((this.zapatillasEnsamblados * this.precioEnsambleZapatillas) * 0.15) : undefined
            }


            this.ensambleManArray.push({
                cargo: 'Ensamblador',
                salarioBase: this.formatNumber(this.ensambladorSalary),
                horasExtra: this.ensambleManHrsExtra,
                valorHoraExtra: this.formatNumber(this.findHourRate(this.ensambladorSalary) * 2.2),
                zapatosEnsamblados: this.zapatosEnsamblados,
                zapatillasEnsamblados: this.zapatillasEnsamblados,
                bonoHijos: this.formatNumber(this.bonoHijos),
                subsidioTransporte: this.formatNumber(106454),
                total: this.formatNumber(this.ensambladorSalary + (this.ensambleManHrsExtra * (this.findHourRate(this.ensambladorSalary) * 2.2)) + incremento + incremento2 + 106454 + this.bonoHijos)
                


            })
        },       

        findHourRate: function(salary) {
            return salary/192
        },

        formatNumber(num) {
            if (!num || num == 'NaN') return '-';
            if (num == 'Infinity') return '&#x221e;';
            num = num.toString().replace(/\$|\,/g, '');
            if (isNaN(num))
                num = "0";
            sign = (num == (num = Math.abs(num)));
            num = Math.floor(num * 100 + 0.50000000001);
            cents = num % 100;
            num = Math.floor(num / 100).toString();
            if (cents < 10)
                cents = "0" + cents;
            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
                num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
            return (((sign) ? '' : '-') + num + ',' + cents);

        }

    }

 


});