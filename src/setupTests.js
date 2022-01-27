import Enzime from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';
import Swal from 'sweetalert2';

Enzime.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer({ mode: 'deep'}))

 
jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    close: jest.fn(),
}));
 