const VALID_PIN = '1234';

// We can change this function to call BE API through axios
export const validateInput = (pinToCheck: string):
    Promise<string> => new Promise((resolve, reject) => setTimeout(() => {
    if (pinToCheck === VALID_PIN) {
        resolve('Your pin is valid')
    } else {
        reject('Your pin is invalid')
    }
}, 2500))
