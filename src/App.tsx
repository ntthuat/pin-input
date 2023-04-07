import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import PinInputGrid from './PinInputGrid';
import {validateInput} from './api';

const PIN_LENGTH = 4;

function App() {
    const [pin, setPin] = useState<Array<number | undefined>>(
        new Array(PIN_LENGTH)
    );
    const [validationResult, setValidationResult] = useState<boolean | undefined>(
        undefined
    );
    const [validationMessage, setValidationMessage] = useState<string | undefined>(undefined);

    const [isValidating, setIsValidating] = useState(false);

    const onPinChanged = (pinEntry: number | undefined, index: number) => {
        const newPin = [...pin];
        newPin[index] = pinEntry;
        setPin(newPin);
    };

    const onPinChangedArray = (pinEntries: Array<number | undefined>, index: number) => {
        const newPin = [...pin];
        let entryIndex = 0;
        for (let i = index; i < PIN_LENGTH && entryIndex < pinEntries.length; i++) {
            newPin[i] = pinEntries[entryIndex];
            entryIndex++;
        }
        setPin(newPin);
    };

    const validatePin = useCallback(async () => {
        setIsValidating(true);
        try {
            const result = await validateInput(pin.join(''));
            setValidationResult(true);
            setValidationMessage(result);
        } catch (e) {
            setValidationMessage(e);
            setValidationResult(false);
            setPin(new Array(PIN_LENGTH));
        } finally {
            setIsValidating(false);
        }
    }, [pin]);

    useEffect(() => {
        const checkPin = async () => {
            if (!pin.includes(undefined)) {
                await validatePin();
            }
        };

        checkPin();
    }, [pin, validatePin]);

    return (
        <div className="App">
            <PinInputGrid
                isValidating={isValidating}
                validationMessage={validationMessage}
                validationResult={validationResult}
                onPinChanged={onPinChanged}
                onPinChangedArray={onPinChangedArray}
                pin={pin}
                pinLength={PIN_LENGTH}
            />

            <button onClick={validatePin}>Validate</button>
        </div>
    );
}

export default App;
