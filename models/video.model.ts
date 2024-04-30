import videos from '~/assets/videos.json';

export default class VideoModel {
  static readonly videos: Videos = videos;

  private static getCurrentIndex(slug: string) {
    return this.videos.findIndex((video: Video) => video.slug === slug);
  }

  public static byName(name: string): Videos {
    return this.videos.filter((video) => {
      return video.title.toLowerCase().includes(name);
    });
  }

  public static bySlug(slug: string): Video | undefined {
    return this.videos.find((video) => video.slug === slug);
  }

  public static byRandom(): Video {
    const random = Math.floor(Math.random() * this.videos.length);
    return this.videos[random];
  }

  public static paginate(slug: string): {
    previousVideo?: Video;
    currentVideo: Video;
    nextVideo?: Video;
  } {
    const currentIndex = this.getCurrentIndex(slug);

    if (currentIndex === -1) {
      throw new Error(`Video with slug ${slug} not found.`);
    }

    const currentVideo = this.videos[currentIndex];
    const previousVideo =
      currentIndex > 0 ? this.videos[currentIndex - 1] : undefined;
    const nextVideo =
      currentIndex < this.videos.length - 1
        ? this.videos[currentIndex + 1]
        : undefined;

    return {
      previousVideo,
      currentVideo,
      nextVideo,
    };
  }
}
