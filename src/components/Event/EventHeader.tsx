import type React from 'react';
import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import AddIcon from '../../assets/add_icon.svg?react';
import { bulkAddTags, db } from '../../utils/indexedDB';
import type { ITag } from './event.interface';
import Typography from '../Typography/Typography';
import { typographyVariants } from '../Typography/typo.interface';

const EventHeader: React.FC = () => {
  const tags = useLiveQuery<ITag[]>(() => db.table('tags').toArray(), []);

  const [selectedTag, setSelectedTag] = useState<ITag>();

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
      <button className="bg-(--primary-75) px-1.5 py-1 rounded-sm h-fit flex items-center justify-center gap-0.5 cursor-pointer">
        <AddIcon className="w-5 h-5 text-white" />
        <Typography
          label="New Events"
          variant={typographyVariants.body_14_500}
          className="text-white"
        />
      </button>
    </header>
  );
};

export default EventHeader;
