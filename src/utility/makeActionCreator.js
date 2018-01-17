export const makeActionCreator = (type, ...argNames) => {
    return function(...args) {
        let action = { type };
        console.log("ARGS", args)
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        });
        return action
    }
};