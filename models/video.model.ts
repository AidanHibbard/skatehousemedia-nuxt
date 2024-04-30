import videos from '~/assets/videos.json';

export default class VideoModel {
  static readonly videos: Videos = videos;

  public static byName(name: string): Videos {
    return this.videos.filter((video) => {
      return video.title.toLowerCase().includes(name);
    });
  }

  public static bySlug(slug: string): Video | undefined {
    return this.videos.find((video) => video.slug === slug);
  }
}
