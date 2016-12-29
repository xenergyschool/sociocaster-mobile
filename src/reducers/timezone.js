import { zones } from 'tzdata'

const defaultState = {
    data: Object.keys(zones)
};

const timezone = (state = defaultState, action) => {
    switch (action.type) {
        default: return state;
    }
};

export default timezone;
