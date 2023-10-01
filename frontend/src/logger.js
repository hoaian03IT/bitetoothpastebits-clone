export const logger = function (reducer) {
    return (prevState, action, args) => {
        console.group(action);
        console.log("Pre State: ", prevState);
        console.log("Action Arguments: ", args);
        const nextState = reducer(prevState, action, args);
        console.log("Next State: ", nextState);
        console.groupEnd();

        return nextState;
    };
};
