import classNames from 'classnames';
import { VscAdd } from 'react-icons/vsc';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { add } from '../../slices/todos';
import { useAppDispatch } from '../../hooks';

const schema = yup
  .object({
    newTodo: yup.string().trim().required(),
  })
  .required();

type FormFields = {
  newTodo: string;
};

const NewTodoForm = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FormFields>({ mode: 'onChange', resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    dispatch(
      add({
        task: data.newTodo,
      }),
    );

    reset();
  };

  const hasErrors = isDirty && errors?.newTodo;

  const errorMessageClasses = classNames(
    'mt-2 rounded bg-nord10 px-2 py-1 text-sm text-white transition-all',
    { 'opacity-0': !hasErrors },
    { 'opacity-1': hasErrors },
  );

  return (
    <>
      <form className="flex" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('newTodo', { required: true })}
          className="form-input flex-1 rounded-l-lg border-0 bg-nord3 text-nord5 shadow-md placeholder:text-gray-400 focus:ring-0"
          placeholder="What are you planning to do?"
        />
        <button
          disabled={Boolean(!isDirty || errors.newTodo)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-r-lg bg-nord3 text-nord14 shadow-md transition-all hover:bg-nord14 hover:text-nord3 disabled:opacity-50 disabled:hover:bg-nord3 disabled:hover:text-nord14"
        >
          <VscAdd />
        </button>
      </form>
      <div className={errorMessageClasses}>You can't do nothing 🙃</div>
    </>
  );
};

export default NewTodoForm;
