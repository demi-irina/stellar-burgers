import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import {
  fetchFeeds,
  selectFeedError,
  selectFeedLoading,
  selectFeedOrders
} from '@slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const isFeedLoading = useSelector(selectFeedLoading);
  const feedError = useSelector(selectFeedError);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (isFeedLoading) {
    return <Preloader />;
  }

  if (feedError) {
    return (
      <p className={`text text_type_main-medium text_color_error`}>
        {feedError}
      </p>
    );
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
