import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const postList = postsService.findMany();

      expect(postList.length).toEqual(posts.length)
    });

    it('should return correct posts for skip and limit options', () => {
      const postList = postsService.findMany({skip: 1, limit: 2});

      expect(postList).toEqual(expect.arrayContaining([
        expect.objectContaining({
          text: 'Post 2',
        }),
        expect.objectContaining({
          text: 'Post 3',
        })
      ]))
    });

    it('will return 0 elements for a limit of 0', () => {
      const postList = postsService.findMany({limit: 0});

      expect(postList.length).toEqual(0)
    })

    it('will return 0 elements if there is too much skip', () => {
      const postList = postsService.findMany({skip: 50});
      expect(postList.length).toEqual(0)
    })

    it('will not return an error if a negative number is passed as skip', () => {
      const postList = postsService.findMany({skip: -1});
      expect(postList).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          text: expect.any(String),
        })
      ]))
    })
  });
});