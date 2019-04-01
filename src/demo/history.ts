import { createHashHistory } from 'history'

const history = createHashHistory({
    basename: '',
    hashType: 'slash',
})
export default history