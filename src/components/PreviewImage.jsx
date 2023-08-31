import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { IoClose } from 'react-icons/io5';

function PreviewImage({ image, idx, handleRemoveImage }) {
  const { atributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: image,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div {...atributes} {...listeners} ref={setNodeRef} className="relative">
      <img
        style={style}
        className="object-contain max-w-[100px] max-h-[100px] p-2 border h-full"
        key={idx}
        src={image}
        alt={`Preview ${idx}`}
      />
      {/* <button
        onClick={() => handleRemoveImage(idx)}
        className="absolute top-1.5 right-1.5 bg-red-400 text-white p-1 w-5 h-5 rounded-full flex justify-center items-center"
      >
        <IoClose />
      </button> */}
    </div>
  );
}

export default PreviewImage;
