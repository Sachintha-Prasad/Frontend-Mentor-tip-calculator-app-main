/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react"
import logo from "../images/logo.svg"
import dollarIcon from "../images/icon-dollar.svg"
import userIcon from "../images/icon-person.svg"

const App = () => {
    const [billAmount, setBillAmount] = useState("")
    const [tipPercent, setTipPercent] = useState(0)
    const [numberOfPeople, setNumberOfPeople] = useState("")
    const [tipAmount, setTipAmount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)

    const handleBillAmountChange = (e) => {
        setBillAmount(e.target.value)
    }

    const handleTipPercentChange = (e) => {
        e.preventDefault()
        setTipPercent(parseFloat(e.target.textContent) / 100)
    }

    const handleNumberOfPeopleChange = (e) => {
        setNumberOfPeople(parseInt(e.target.value))
    }

    const calculateTip = () => {
        if (billAmount && tipPercent && numberOfPeople) {
            const tip = (parseFloat(billAmount) * tipPercent) / numberOfPeople
            setTipAmount(tip)
            setTotalAmount(parseFloat(billAmount) / numberOfPeople + tip)
        } else {
            setTipAmount(0)
            setTotalAmount(0)
        }
    }

    const resetCalculator = () => {
        setBillAmount("")
        setTipPercent(0)
        setNumberOfPeople("")
        setTipAmount(0)
        setTotalAmount(0)
    }

    return (
        <div className="bg-light-grayish-cyan min-h-screen font-space-mono font-bold text-dark-grayish-cyan">
            <div className="container absolute top-[4rem] left-1/2 -translate-x-1/2 mobile:top-1/2 mobile:-translate-y-1/2 flex flex-col gap-16 items-center justify-center">
                <div className="logo w-full">
                    <img src={logo} alt="" className="mx-auto" />
                </div>

                <div className="calculator flex flex-col sm:flex-row gap-6 max-w-[800px] p-6 w-full mx-auto bg-white rounded-lg">
                    <div
                        id="cal-form"
                        className="input-container flex flex-col gap-6 sm:w-1/2"
                    >
                        <div className="bill-amount-field flex flex-col">
                            <label htmlFor="bill-amount">Bill</label>
                            <div className="input-box">
                                <img src={dollarIcon} alt="" />
                                <input
                                    id="bill-amount"
                                    type="number"
                                    className="input"
                                    value={billAmount}
                                    onChange={handleBillAmountChange}
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div className="select-tip-field flex flex-col gap-2">
                            <p>Select Tip %</p>
                            <div className="tip-grid grid grid-cols-2 mobile:grid-cols-3 gap-2">
                                {[5, 10, 15, 25, 50].map((percent) => (
                                    <button
                                        key={percent}
                                        className="tip-btn tips"
                                        onClick={handleTipPercentChange}
                                    >
                                        {percent}%
                                    </button>
                                ))}
                                <input
                                    type="number"
                                    className="input rounded-md min-w-[80px] text-center focus-within:ring-strong-cyan focus-within:ring-2 outline-none"
                                    onChange={(e) =>
                                        setTipPercent(
                                            parseFloat(e.target.value) / 100
                                        )
                                    }
                                    placeholder="Custom"
                                />
                            </div>
                        </div>

                        <div
                            className={`no-of-people flex flex-col relative ${
                                numberOfPeople === 0 ? "error" : ""
                            }`}
                        >
                            <label htmlFor="people-amount">
                                Number of people
                            </label>
                            <div
                                className={`input-box ${
                                    numberOfPeople === 0 ? "error" : ""
                                }`}
                            >
                                <img src={userIcon} alt="" />
                                <input
                                    id="people-amount"
                                    type="number"
                                    className="input"
                                    value={numberOfPeople}
                                    onChange={handleNumberOfPeopleChange}
                                    placeholder="0"
                                />
                            </div>
                            {numberOfPeople === 0 && (
                                <p className="text-red-500 absolute top-0 right-0">
                                    can't be zero
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="display-container flex flex-col gap-6 sm:w-1/2 bg-very-dark-cyan rounded-lg p-6">
                        <div className="tip-container flex items-center justify-between">
                            <div className="desc">
                                <h2 className="text-lg text-white">
                                    Tip Amount
                                </h2>
                                <p>/ person</p>
                            </div>
                            <div className="tip-amount flex items-center gap-2">
                                <img
                                    src={dollarIcon}
                                    alt=""
                                    className="w-[15px] h-[20px]"
                                />
                                <p className="text-4xl text-strong-cyan">
                                    {tipAmount.toFixed(2)}
                                </p>
                            </div>
                        </div>
                        <div className="total-container flex items-center justify-between">
                            <div className="desc">
                                <h2 className="text-lg text-white">Total</h2>
                                <p>/ person</p>
                            </div>
                            <div className="total-amount flex items-center gap-2">
                                <img
                                    src={dollarIcon}
                                    alt=""
                                    className="w-[15px] h-[20px]"
                                />
                                <p className="text-4xl text-strong-cyan">
                                    {totalAmount.toFixed(2)}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={calculateTip}
                            className="calculate-tip bg-strong-cyan p-2 uppercase text-very-dark-cyan text-xl rounded-md tracking-tight hover:bg-light-grayish-cyan outline-none focus:bg-light-grayish-cyan"
                        >
                            Calculate Tip
                        </button>
                        <button
                            onClick={resetCalculator}
                            className="reset bg-strong-cyan p-2 uppercase text-very-dark-cyan text-xl rounded-md tracking-tight hover:bg-light-grayish-cyan outline-none focus:bg-light-grayish-cyan"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
