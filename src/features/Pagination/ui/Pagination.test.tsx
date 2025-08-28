import { render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';
import userEvent from '@testing-library/user-event';

describe('Pagination', () => {
  const setup = (page: number, totalPages: number, onPageChange = vi.fn()) => {
    render(
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        isLoading={false}
      />
    );
    return { onPageChange };
  };

  test('should disable left buttons on first page', () => {
    setup(1, 10);

    expect(screen.getByLabelText('first page')).toBeDisabled();
    expect(screen.getByLabelText('previous page')).toBeDisabled();
    expect(screen.getByLabelText('previous pages')).toBeDisabled();
  });

  test('should disable right buttons on last page', () => {
    setup(10, 10);

    expect(screen.getByLabelText('next page')).toBeDisabled();
    expect(screen.getByLabelText('next pages')).toBeDisabled();
    expect(screen.getByLabelText('last page')).toBeDisabled();
  });

  test('should call onPageChange when clicking right arrow', async () => {
    const { onPageChange } = setup(5, 10);
    const user = userEvent.setup();

    await user.click(screen.getByLabelText('next page'));
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  test('should call onPageChange with 1 on firstPage click', async () => {
    const { onPageChange } = setup(8, 10);
    const user = userEvent.setup();

    await user.click(screen.getByLabelText('first page'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  test('should call onPageChange with lastPage on lastPage click', async () => {
    const { onPageChange } = setup(3, 10);
    const user = userEvent.setup();

    await user.click(screen.getByLabelText('last page'));
    expect(onPageChange).toHaveBeenCalledWith(10);
  });

  test('should call onPageChange with page + 5 on nextPages click', async () => {
    const { onPageChange } = setup(2, 10);
    const user = userEvent.setup();

    await user.click(screen.getByLabelText('next pages'));
    expect(onPageChange).toHaveBeenCalledWith(7);
  });

  test('should call onPageChange with page - 5 on prevPages click', async () => {
    const { onPageChange } = setup(9, 10);
    const user = userEvent.setup();

    await user.click(screen.getByLabelText('previous pages'));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  test('should not call onPageChange when disabled button is clicked', async () => {
    const { onPageChange } = setup(10, 10);
    const user = userEvent.setup();

    await user.click(screen.getByLabelText('next page'));
    expect(onPageChange).not.toHaveBeenCalled();
  });
});
