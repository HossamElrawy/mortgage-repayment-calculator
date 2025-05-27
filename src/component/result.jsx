import "./result.css"
import { useEffect, useState } from "react"

function Results (props) {
    const [ monthlyRepayments, setMonthlyRepayments ] = useState(null);
    const [ totalRepay, setTotalRepay ] = useState(null);
    useEffect(()=>{
        calculteRepayments()
    },[props.showResult])
    
    function calculteRepayments() {
        const n = Number(props.term)*12
        const amount = Number(props.amount.replace(/,/g, ''));
        const annualInterestRate = Number(props.rate)/(100*12)
        let totalRepaycal
        if (props.type === "Repayment") {
            const ratePowerN = Math.pow(1+annualInterestRate, n)
            const monthlyRepaymentsCal = formatCalculation(amount*((annualInterestRate*ratePowerN)/(ratePowerN-1)))
            console.log(monthlyRepaymentsCal);            
            totalRepaycal = formatCalculation(n*(amount*((annualInterestRate*ratePowerN)/(ratePowerN-1))))
            setMonthlyRepayments(monthlyRepaymentsCal)
        } else if (props.type === "Interest Only") {
            const monthlyRepaymentsCal = formatCalculation(amount*annualInterestRate)
            totalRepaycal = formatCalculation(n*(amount*annualInterestRate))
            setMonthlyRepayments(monthlyRepaymentsCal)
        }   
        setTotalRepay(totalRepaycal)
    }
    function formatCalculation(argument) {
        const formatted = argument.toLocaleString('en-UK', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        return formatted
    }
    return (
        <div className={"result-div another-div"}>
                <p className="your-para">
                    Your Results
                </p>
                <p className="white-color">
                    Your results are shown below based on the information you provided. 
                    To adjust the results, edit the form and click “calculate repayments” again.
                </p>
                <div className="res-me">
                    <p className="monthly-para">
                        Your monthly repayments
                    </p>
                    <p className="res-1">
                        £{monthlyRepayments}
                    </p>
                    <p className="total-para">
                        Total you'll repay over the term
                    </p>
                    <p className="res-2">
                        £{totalRepay}
                    </p>
                </div>

        </div>
    )
}

export default Results 
