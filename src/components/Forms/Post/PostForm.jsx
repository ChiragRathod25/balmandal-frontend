import React,{useEffect,useCallback} from 'react';
import { RTE, Input,  Button } from '../../index.js';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import databaseService from '../../../services/database.services.js';

function PostForm({ post }) {
  const { handleSubmit, register, getValues, control,watch,setValue} = useForm({
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      slug: post?.slug || '',
      status: post?.status || 'Draft',
      tags: post?.tags.join(',') || '',
      isCommentEnable: post?.isCommentEnable || true,
    },
  });

  const navigate = useNavigate();
  const submit = async (data) => {

    if (post) {
      const response = await databaseService
        .updatePost(data, post._id)
        .then((response) => response.data);
      if (response) { 
        navigate('/post/' + response._id);
      }
    } else {
      const response = await databaseService.addPost(data).then((response) => response.data);
      if (response) {
        navigate('/post/' + response._id);
      }
    }
  };
  
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title")
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
    });
    return () => subscription.unsubscribe();
  }, [slugTransform, watch, setValue]);

  return (
    <>
      <div className=" w-full">
        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-4
      flex flex-col justify-center items-center w-full mx-auto"
        >
          <Input
            name="title"
            label="Title: "
            {...register('title', { required: true })}
            placeholder="Enter Post Title"
            className="w-full"
          />
          <RTE
            name="content"
            label="Content: "
            control={control}
            defaultValue={getValues('content')}
          />
          {/* <Input
            name="slug"
            label="Slug: "
            {...register('slug', { required: true })}
            placeholder="Enter Post Slug"
            className="w-full"
          /> */}

          {/* <Select
            name="status"
            label="Status: "
            {...register('status', )}
            className="w-full"
            options={['Draft', 'Published']}
          /> */}
          
          {/* <Input
            name="tags"
            label="Tags: "
            {...register('tags', )}
            placeholder="Enter Post Tags"
            className="w-full"
          /> */}

          {/* <div className="flex flex-row items-center gap-2 w-full max-w-md mx-auto">
            <input
              type="checkbox"
              id="isCommentEnable"
              {...register('isCommentEnable')}
              className="w-4 h-4 accent-blue-500"
            />
            <label htmlFor="isCommentEnable" className="text-sm text-gray-700 font-medium">
              Enable Comments
            </label>
          </div> */}

          <Button type="submit">{post ? 'Update Post' : 'Add Post'}</Button>
        </form>
      </div>
    </>
  );
}

export default PostForm;
