import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import BlockItem from "./_components/block-item";
import { AssignBlockGroup, Block } from "@prisma/client";

export interface AssignBlockData extends Block {
  assign_block_groups?: AssignBlockGroup[] | null | undefined;
}
const TeachingPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user.user_id) {
    redirect("/login");
  }

  if (session?.user.role_id === 1) {
    redirect("/main");
  }

  const blocks: AssignBlockData[] = await db.block.findMany({
    where: { owner_id: Number(session?.user.user_id) },
    include: {
      assign_block_groups: true,
    },
  });

  const groups = await db.group.findMany({});

  return (
    <div className="w-full h-full px-32">
      <h1 className=" text-center font-bold text-3xl">Мои учебные блоки</h1>
      {blocks.length > 0 ? (
        <div className="grid grid-cols-4 gap-4 content-center justify-items-stretch mt-6">
          {blocks
            .sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
            .map((block) => (
              <BlockItem
                key={block.block_id}
                block={block}
                groups={groups}
                hideExtraFields={false}
              />
            ))}
        </div>
      ) : (
        <h2 className="mt-6 font-semibold text-center">
          У вас нет учебных блоков
        </h2>
      )}
    </div>
  );
};

export default TeachingPage;
