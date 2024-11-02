'use client';
import { useEffect, useState } from 'react';

import CommunityFeed from '@/app/(after-login)/community/_components/community-feed';
import CommunityLayout from '@/app/(after-login)/community/_components/community-layout';
import Layout from '@/components/layout';
import { useGetAuthId } from '@/queries/authQuery';
import { usePostCategoryMutation } from '@/queries/postQuery';
import { useMyIdStore } from '@/stores/userId';

interface FeedData {
  postId: number;
  userId: number;
  nickname: string;
  imgUrl: string;
  category: string;
  content: string;
  title: string;
  uploadDate: string;
  likeCnt: number;
  commentCnt: number;
  imgUrlList: string[];
}
[];

const Community = () => {
  const [activeChip, setActiveChip] = useState<string | null>('ALL');
  const [sortOption, setSortOption] = useState('Latest');
  const [feedData, setFeedData] = useState<FeedData[]>([]);
  const { data: userId } = useGetAuthId();
  const { setUserId } = useMyIdStore();

  const { mutate, data, error, isError } = usePostCategoryMutation({
    onSuccess: data => {
      console.log('PostCategory fetched successfully:', data);
    },
    onError: error => {
      console.error('Error fetching PostCategory:', error);
    },
  });

  useEffect(() => {
    if (data?.response?.posts) {
      const transformedData = data.response.posts.map(post => ({
        postId: post.postId,
        userId: post.user.userId,
        nickname: post.user.nickname,
        imgUrl: post.user.imgUrl,
        category: post.category,
        content: post.content,
        title: post.title,
        uploadDate: post.uploadDate,
        likeCnt: post.likeCnt,
        commentCnt: post.commentCnt,
        imgUrlList: post.imgUrlList.map(img => img.url),
      }));

      const filteredAndSortedData = transformedData
        .filter(post => activeChip === 'ALL' || post.category === activeChip)
        .sort((a, b) => {
          if (sortOption === 'Latest') {
            return (
              new Date(b.uploadDate).getTime() -
              new Date(a.uploadDate).getTime()
            );
          } else if (sortOption === 'Popular') {
            return Number(b.likeCnt) - Number(a.likeCnt);
          }
          return 0;
        });

      setFeedData(filteredAndSortedData);
    }
  }, [data, activeChip, sortOption]);

  useEffect(() => {
    mutate('ALL');

    if (userId) {
      setUserId(userId.response);
    }
  }, [mutate, userId, setUserId]);

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <Layout title='Community' back={false} hasTopNav={true} hasTabBar={true}>
      <CommunityLayout
        activeChip={activeChip}
        setActiveChip={setActiveChip}
        sortOption={sortOption}
        setSortOption={setSortOption}
      >
        {feedData.map((data, index) => (
          <CommunityFeed
            userId={data.userId}
            postId={data.postId}
            key={index}
            profileImage={data.imgUrl}
            nickname={data.nickname}
            uploadDate={data.uploadDate}
            category={data.category}
            communityPostTitle={data.title}
            communityPost={data.content}
            postImage={data.imgUrlList}
            likesCount={data.likeCnt}
            commentCount={data.commentCnt}
          />
        ))}
      </CommunityLayout>
    </Layout>
  );
};

export default Community;
