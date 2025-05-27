import './calculator.css'
import Results from './result'
import calculatorIcon from "../../assets/images/icon-calculator.svg" 
import { useState } from 'react'
import illusEmpty from "../../assets/images/illustration-empty.svg"

function Calculator () {
    const [numbers, setNumbers] = useState({
        amount: "",
        term: "",
        rate: "",
        type: ""
    })
    const [errors , setError ] = useState ({
        amountError: false,
        termError: false,
        rateError: false,
        typeError: false,
        showResult: false,
        calculate: false
    })
    const [checkboxes, setCheckboxes] = useState({
        check1: false,
        check2: false
    });
    function handleAmount(e) {
        const formatted = formatNumber(e.target.value);
        setNumbers ( prev => (
            {
                ...prev,
                amount: formatted
            }
        ))
    }
    function handleTerm(e) {
        setNumbers ( prev => (
            {
                ...prev,
                term: e.target.value
            }
        ))
    }
    function handleRate(e) {
        setNumbers ( prev => (
            {
                ...prev,
                rate: e.target.value                
            }
        ))
    }
    function handleType(e) {
        setNumbers ( prev => (
            {
                ...prev,
                type: e.target.value
            }
        ))
    }
    function validateAmount() {
        if (!numbers.amount) {
            setError ( prev => (
                {
                    ...prev,
                    amountError: true
                }
            ))
            return false
        } else {
            setError ( prev => (
                {
                    ...prev,
                    amountError: false
                }
            ))    
            return true
        }   
    }
    function validateTerm() {
        if (!numbers.term) {
            setError ( prev => (
                {
                    ...prev,
                    termError: true
                }
            )) 
            return false
        } else {
            setError ( prev => (
                {
                    ...prev,
                    termError: false
                }
            ))    
            return true
        }   
    }
    function validateRate() {
        if (!numbers.rate) {
            setError ( prev => (
                {
                    ...prev,
                    rateError: true
                }
            )) 
            return false
        } else {
            setError ( prev => (
                {
                    ...prev,
                    rateError: false
                }
            ))    
            return true
        }   
    }
    function validateType() {
        if (!numbers.type) {
            setError ( prev => (
                {
                    ...prev,
                    typeError: true
                }
            )) 
            return false
        } else {
            setError ( prev => (
                {
                    ...prev,
                    typeError: false
                }
            ))      
            return true
        }   
    }
    function hanldeClick () {
        const validAmount = validateAmount()
        const validTerm = validateTerm()
        const validRate = validateRate()
        const validType = validateType()        
        if (validAmount && validRate && validTerm && validType) {
            setError (prev => ({
                ...prev,
                showResult: true,
                calculate: !prev.calculate
            }))
        }
    }
    const formatNumber = (value) => {
        const numeric = value.replace(/\D/g, '');
        return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    function handleClear () {
        setNumbers({
            amount: "",
            term: "",
            rate: "",
            type: ""
        })
        setError({
            amountError: false,
            termError: false,
            rateError: false,
            typeError: false,
            showResult: false,
            calculate: false
        })
        setCheckboxes({
            check1: false,
            check2: false
        });
    }
    return (
    <div className="cal-div">
        <div className='cal-here'>
            <div className='name-clear-div'>
                <p className='head-para'>
                    Mortgage Calculator
                </p>
                <button className='clear-but' onClick={handleClear}>
                    Clear All
                </button>
            </div>
            <form>
                <div className='amount-div'>
                    <label htmlFor="mortage-amount">
                        Mortgage Amount
                    </label>
                    <div className='input-wrapper'>
                        <span className={errors.amountError ? 'unit warn-unit' : 'unit'}>£</span>
                        <input 
                            type="text" 
                            name='mortage-amount' 
                            className={errors.amountError ? 'input-mortage warn-input' : 'input-mortage'}
                            onChange={handleAmount}
                            value={numbers.amount}
                        />
                        {errors.amountError && <p className='warn-para'>This feild is required</p>}
                    </div>
                </div>
                <div className='term-rate-div'>
                    <div className='amount-div'>
                        <label htmlFor="mortage-term">
                            Mortgage Term
                        </label>
                        <div className='input-wrapper'>
                            <span className={errors.termError ? 'unit-2 warn-unit' : 'unit-2'}>years</span>
                            <input 
                                type="number" 
                                name='mortage-term' 
                                className={errors.termError ? 'input-term warn-input' : 'input-term'}
                                onChange={handleTerm}
                                value={numbers.term}
                            />
                            {errors.termError && <p className='warn-para'>This feild is required</p>}
                        </div>
                    </div>
                    <div className='amount-div'>
                        <label htmlFor="interest-rate">
                            Interest Rate
                        </label>
                        <div className='input-wrapper'>
                            <span  className={errors.rateError ? 'unit-2 warn-unit' : 'unit-2'}>%</span>
                            <input 
                                type="number" 
                                name='interest-rate' 
                                className={errors.rateError ? 'input-term warn-input' : 'input-term'}
                                onChange={handleRate}
                                value={numbers.rate}
                            />
                            {errors.rateError && <p className='warn-para'>This feild is required</p>}
                        </div>
                    </div>
                </div>
                <div className='type-div'>
                    <label className='type-label'>Mortgage Type</label>
                    <div className="radio-group">
                        <label className="radio-option">
                            <input
                                type="radio"
                                name="mortgageType"
                                value="Repayment"
                                onChange={handleType}
                                checked={numbers.type === "Repayment"}
                            />
                            Repayment
                        </label>

                        <label className="radio-option">
                            <input
                                type="radio"
                                name="mortgageType"
                                value="Interest Only"
                                onChange={handleType}
                                checked={numbers.type === "Interest Only"}
                            />
                            Interest Only
                        </label>
                        {errors.typeError && <p className='warn-para'>This feild is required</p>}
                    </div>
                </div>
            </form>
            <button className='cal-but' onClick={hanldeClick}>
                <img src={calculatorIcon} className='cla-icon' alt="" />
                <p>
                    Calculate Repayments
                </p>
            </button>
        </div>
        {errors.showResult ? 
        <Results  
            showResult={errors.calculate}
            amount={numbers.amount}
            rate= {numbers.rate}
            type= {numbers.type}
            term= {numbers.term}
        /> :
            <div className="result-div">
                <img src={illusEmpty} alt="" />
                <p className="results-para">
                    Results shown here
                </p>
                <p className="complete-para">
                    Complete the form and click “calculate repayments” to see what 
                    your monthly repayments would be.
                </p>
            </div>}
    </div>)
}

export default Calculator