import { expect, describe, it } from 'vitest';
import VideoModel from '../../models/video.model';

describe('Video Model', () => {
  describe('#byName', () => {
    it('Should find all matching videos by name', () => {
      expect(VideoModel.byName('test')).toEqual([
        {
          slug: 'photo-contest-update',
          src: 'https://assets.skatehousemedia.com/Photo-Contest-Update.mp4',
          thumbnail:
            'https://assets.skatehousemedia.com/thumbnails/Photo-Contest-Update.jpg',
          title: 'Photo Contest Update',
        },
      ]);
    });
  });
  describe('#bySlug', () => {
    it('Should return the first video with a matching slug', () => {
      expect(VideoModel.bySlug('photo-contest-update')).toEqual({
        slug: 'photo-contest-update',
        src: 'https://assets.skatehousemedia.com/Photo-Contest-Update.mp4',
        thumbnail:
          'https://assets.skatehousemedia.com/thumbnails/Photo-Contest-Update.jpg',
        title: 'Photo Contest Update',
      });
    });
  });
  describe('#byRandom', () => {
    it('Should return a random video', () => {
      expect(VideoModel.byRandom()).toBeTypeOf('object');
    });
  });
  describe('#paginate', () => {
    describe('Surrounding videos', () => {
      it('Should return the current, and surrounding videos', () => {
        expect(VideoModel.paginate('photo-contest-update')).toEqual({
          currentVideo: {
            slug: 'photo-contest-update',
            src: 'https://assets.skatehousemedia.com/Photo-Contest-Update.mp4',
            thumbnail:
              'https://assets.skatehousemedia.com/thumbnails/Photo-Contest-Update.jpg',
            title: 'Photo Contest Update',
          },
          nextVideo: {
            slug: 'photoshoot-video',
            src: 'https://assets.skatehousemedia.com/Photoshoot-Video.mp4',
            thumbnail:
              'https://assets.skatehousemedia.com/thumbnails/Photoshoot-Video.jpg',
            title: 'Photoshoot Video',
          },
          previousVideo: {
            slug: 'photo-contest-update-2',
            src: 'https://assets.skatehousemedia.com/Photo-Contest-Update-2.mp4',
            thumbnail:
              'https://assets.skatehousemedia.com/thumbnails/Photo-Contest-Update-2.jpg',
            title: 'Photo Contenst Update 2',
          },
        });
      });
    });
    describe('No previous video', () => {
      it('Should return an undefined value for previousVideo', () => {
        expect(VideoModel.paginate('15-crashes-at-angies')).toEqual({
          currentVideo: {
            slug: '15-crashes-at-angies',
            src: 'https://assets.skatehousemedia.com/15-Crashes-at-Angies-Final.mp4',
            thumbnail:
              'https://assets.skatehousemedia.com/thumbnails/15-Crashes-at-Angies-Final.jpg',
            title: '15 Crashes at Angies',
          },
          nextVideo: {
            slug: '2011-compilation-part-1',
            src: 'https://assets.skatehousemedia.com/2011-Compilation-Part-1.mp4',
            thumbnail:
              'https://assets.skatehousemedia.com/thumbnails/2011-Compilation-Part-1.jpg',
            title: '2011 Compilation Part 1',
          },
          previousVideo: undefined,
        });
      });
    });
    describe('No next video', () => {
      it('Should return an undefined value for nextVideo', () => {
        expect(VideoModel.paginate('zoobomb')).toEqual({
          currentVideo: {
            slug: 'zoobomb',
            src: 'https://assets.skatehousemedia.com/Zoobomb.mp4',
            thumbnail:
              'https://assets.skatehousemedia.com/thumbnails/Zoobomb.jpg',
            title: 'Zoobomb',
          },
          nextVideo: undefined,
          previousVideo: {
            slug: 'zak-maytum-driveway-bomb',
            src: 'https://assets.skatehousemedia.com/Zak-Maytum-Driveway-Bomb.mp4',
            thumbnail:
              'https://assets.skatehousemedia.com/thumbnails/Zak-Maytum-Driveway-Bomb.jpg',
            title: 'Zak Maytum Driveway Bomb',
          },
        });
      });
    });
    describe('Errors', () => {
      describe('When no video is found', () => {
        it('Should throw an error', () => {
          expect(() => VideoModel.paginate('ugh')).toThrow(
            `Video with slug ugh not found.`,
          );
        });
      });
    });
  });
});
