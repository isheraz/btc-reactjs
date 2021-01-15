/* eslint-disable jsx-a11y/label-has-associated-control */
import { any } from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import roles from '../roles';
import createUser from '../services/firebase';

const mainDivStyle = {
  background: '#edf2f7',
};

// prop types validations
interface Step1Props {
  currentStep: number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface Step2Props {
  currentStep: number;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}
interface NextButtonProps {
  handleChange: (
    event: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => void;
  buttonText: String;
}

function Step1(props: Step1Props) {
  const { currentStep, handleChange } = props;
  if (currentStep !== 1) {
    return null;
  }
  return (
    <div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            First Name
          </label>
          <input
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
            id="grid-first-name"
            name="firstName"
            required
            type="text"
            placeholder="Jane"
            onChange={handleChange}
          />
          <p className="text-red text-xs italic">Please fill out this field.</p>
        </div>
        <div className="md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Last Name
          </label>
          <input
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            id="grid-last-name"
            type="text"
            placeholder="Doe"
            name="lastName"
            required
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-full px-3">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Password
          </label>
          <input
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
            id="grid-password"
            type="password"
            placeholder="******************"
            name="password"
            required
            onChange={handleChange}
          />
          <p className="text-grey-dark text-xs italic">
            Make it as long and as crazy as you like
          </p>
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-full px-3">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            htmlFor="grid-email"
          >
            Email
          </label>
          <input
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
            id="grid-email"
            type="email"
            placeholder="ahmad-mukhtar@invozone.com"
            name="email"
            required
            onChange={handleChange}
          />
          <p className="text-grey-dark text-xs italic">Provide valid email.</p>
        </div>
      </div>
    </div>
  );
}

function Step2(props: Step2Props) {
  const { currentStep, handleChange } = props;
  if (currentStep !== 2) {
    return null;
  }
  return (
    <div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            htmlFor="grid-organization-name"
          >
            Organization Name
          </label>
          <input
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
            id="grid-organization-name"
            type="text"
            placeholder="Invozone"
            name="organizationName"
            required
            onChange={handleChange}
          />
          <p className="text-red text-xs italic">Please fill out this field.</p>
        </div>
        <div className="md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            htmlFor="grid-dob-name"
          >
            DOB
          </label>
          <input
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            id="grid-dob-name"
            type="text"
            placeholder="23/11/1994"
            name="dob"
            required
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-full px-3">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            htmlFor="grid-role"
          >
            Role
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
              id="grid-role"
              name="role"
              required
              onChange={handleChange}
            >
              <option>Select User Role</option>
              {Object.values(roles).map((value) => (
                <option key={value.key} value={value.key}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-full px-3">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            htmlFor="grid-image"
          >
            Image
          </label>
          <input
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
            id="grid-image"
            type="file"
            accept="image/*"
            name="image"
            required
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

// next button for updating current step
function NextButton(props: NextButtonProps) {
  const { handleChange, buttonText } = props;
  return (
    <button
      type="button"
      className="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-700 hover:bg-purple-900 text-white font-normal py-2 px-4 mr-1 rounded"
      onClick={handleChange}
    >
      {buttonText}
    </button>
  );
}

// main parent register function
function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [inputField, setInputField] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    role: '',
    dob: '',
    organizationName: '',
    image: any,
  });
  const [error, setError] = useState('');
  const history = useHistory();

  // step change handling
  const handleChange = () => {
    // step1 fields validations
    const step1Completed =
      inputField.firstName &&
      inputField.lastName &&
      inputField.password &&
      inputField.email;

    // step1 is incomplete
    if (!step1Completed) {
      showError();
      return;
    }

    // step 1 then increment the step state
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
      return;
    }

    // step2 fields validation
    const step2Completed =
      inputField.organizationName && inputField.dob && inputField.role;
    if (!step2Completed) {
      showError();
      return;
    }
    submitForm();
  };

  // handle the field values
  const handleInput = (event: {
    target: { files?: any; name?: any; value?: string };
  }) => {
    const { name } = event.target;
    let { value } = event.target;
    if (name === 'image') {
      [value] = event.target.files;
    }
    setInputField({ ...inputField, [name]: value });
  };

  // form submissions handling
  const submitForm = () => {
    createUser(inputField)
      .then((user: any) => {
        history.push(`/users/${user.uid}`);
      })
      .catch((err) => {
        showError(err.toString());
      });
  };

  // show form error
  const showError = (e = 'All fields are required!!') => {
    setError(e);
    setTimeout(() => {
      setError('');
    }, 3000);
  };
  return (
    <div
      className="h-screen overflow-hidden flex items-center justify-center"
      style={mainDivStyle}
    >
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div className="ml-2/5  mb-6 bg-purple-700 rounded-full h-12 w-12 flex items-center justify-center">
          <span className="text-center text-white">{currentStep}</span>
        </div>
        <Step1 currentStep={currentStep} handleChange={handleInput} />
        <Step2 currentStep={currentStep} handleChange={handleInput} />
        <NextButton
          handleChange={handleChange}
          buttonText={currentStep === 1 ? 'Next' : 'Submit'}
        />
        {error && (
          <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-700 bg-red-100 border border-red-300 ">
            <div className="text-xl font-normal  max-w-full flex-initial">
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
