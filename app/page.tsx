import { NewsEntity } from "@/entities/news.entity";
import { getNews } from "@/services/news";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { data: data_vui_choi } = await getNews({ category_slug: 'be-vui-choi', page: 1, page_size: 4 }) as unknown as { data: NewsEntity[] }
  const { data: data_nuoi_day } = await getNews({ category_slug: 'kien-thuc-nuoi-day-con', page: 1, page_size: 4 }) as unknown as { data: NewsEntity[] }
  const { data: data_do_dung_cho_be } = await getNews({ category_slug: 'do-dung-cho-be', page: 1, page_size: 4 }) as unknown as { data: NewsEntity[] }

  return (
    <main className="py-4">
      <section className="max-w-6xl m-auto flex gap-4 mb-8">
        {data_vui_choi.length !== 0 ? (
          <div className="w-2/3">
            <Link href={`/be-vui-choi/${data_vui_choi[0].slug}`}>
              <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data_vui_choi[0].thumbnail_url}`} alt={data_vui_choi[0].title} width={1920} height={1080} className="mb-2" />
              <h3 className="text-2xl font-bold mb-4">{data_vui_choi[0].title}</h3>
              <div className="content text-sm" dangerouslySetInnerHTML={{ __html: truncateText(data_vui_choi[0].content, 20) }} />
            </Link>
            <div className="flex gap-4">
              {data_vui_choi.slice(1, data_vui_choi.length).map(item => (
                <Link href={`/be-vui-choi/${item.slug}`} key={item.id} className="w-1/3">
                  <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.thumbnail_url}`} alt={item.title} width={336} height={188} className="w-full mb-2 h-[160px] object-cover" />
                  <h3 className="mb-4">{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <p>Không có dữ liệu</p>
        )}
        <div className="w-1/3">
          {data_nuoi_day.length !== 0 ? (
            <>
              <Link href={`/kien-thuc-nuoi-day-con/${data_nuoi_day[0].slug}`} className="border-b ">
                <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data_nuoi_day[0].thumbnail_url}`} alt={data_nuoi_day[0].title} width={336} height={188} className="w-full mb-2" />
                <h3 className="text-xl font-bold mb-4">{data_nuoi_day[0].title}</h3>
              </Link>
              <div className="">
                {data_nuoi_day.slice(1, data_nuoi_day.length).map(item => (
                  <div key={item.id} className="border-b py-2">
                    <Link href={`/kien-thuc-nuoi-day-con/${item.slug}`} className="mb-4">{item.title}</Link>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>Không có dữ liệu</p>
          )}
        </div>
      </section>
      <section className="max-w-6xl m-auto mb-8">
        <div className="w-full bg-[#f34764] p-2">
          <h2 className="uppercase font-bold text-white">Đồ dùng cho bé</h2>
        </div>
        {data_do_dung_cho_be.length !== 0 ? (
          <div>
            {data_do_dung_cho_be.map(item => (
              <Link href={`/do-dung-cho-be/${item.slug}`} key={item.id} className="mb-2">
                <div className="flex items-center gap-4">
                  <div className="mb-4">
                    <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.thumbnail_url}`} alt={item.title} width={336} height={188} className="h-[188px] object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold">{item.title}</h5>
                    <div className="text-sm" dangerouslySetInnerHTML={{ __html: truncateText(item.content, 50) }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </section>
    </main>
  );
}
