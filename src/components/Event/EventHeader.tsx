import type React from 'react';
import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import type { ITag } from './event.interface';
import { bulkAddTags, db } from '../../utils/indexedDB';
import { typographyVariants } from '../Typography/typo.interface';
import AddIcon from '../../assets/add_icon.svg?react';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import CreateEventModal from '../Modal/CreateEventModal';

const EventHeader: React.FC<{ hideAction: boolean }> = ({ hideAction }) => {
  const tags = useLiveQuery<ITag[]>(() => db.table('tags').toArray(), []);

  const [selectedTag, setSelectedTag] = useState<ITag>();
  const [show, setShow] = useState<boolean>(false);

  const onClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (tags?.length === 0) {
      bulkAddTags([
        {
          name: 'Short term',
        },
        {
          name: 'Long term',
        },
      ]);
    } else if (tags && !selectedTag) {
      setSelectedTag(tags[0]);
    }
  }, [tags]);

  return (
    <header className="w-full p-1 flex flex-wrap justify-end items-center">
      <div className="flex flex-1 p-1 max-w-full">
        <div className="max-w-[calc(100%-34px)] overflow-auto flex">
          {tags?.map((tag) => (
            <button
              className={`p-2.5 w-37.5 text-nowrap text-center cursor-pointer border-b-2  ${
                selectedTag?.name === tag.name
                  ? 'border-(--primary-50)'
                  : 'border-(--light)'
              }`}
              onClick={() => setSelectedTag(tag)}
            >
              <Typography
                label={tag.name}
                variant={
                  selectedTag?.name === tag.name
                    ? typographyVariants.body_14_500
                    : typographyVariants.body_14_400
                }
                className={
                  selectedTag?.name === tag.name ? 'text-(--primary-50)' : ''
                }
              />
            </button>
          ))}
        </div>
        <div className="p-1.25 bg-(--primary-05) rounded-sm cursor-pointer flex items-center justify-center">
          <AddIcon className="w-6 h-6 text-(--dark)" />
        </div>
      </div>
      {!hideAction && (
        <Button
          label="New Events"
          icon={<AddIcon className="w-5 h-5 text-white" />}
          onClick={() => setShow(true)}
          className="fixed md:relative w-full md:w-auto bottom-0 left-0"
        />
      )}
      <CreateEventModal show={show} onClose={onClose} />
    </header>
  );
};

export default EventHeader;
