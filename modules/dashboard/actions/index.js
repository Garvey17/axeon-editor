"use server"

import { db } from "@/lib/db"
import { currentUser } from "../../auth/actions"
import { revalidatePath } from "next/cache"
import { describe } from "zod/v4/core"

// this contains dashboard actions

// export const toggleStarMarked = async (
//   playgroundId,
//   isChecked
// ) => {
//   const user = await currentUser();
//   const userId = user?.id;
//   if (!userId) {
//     throw new Error("User Id is Required");
//   }

//   try {
//     if (isChecked) {
//       await db.starMark.create({
//         data: {
//           userId: userId,
//           playgroundId,
//           isMarked: isChecked,
//         },
//       });
//     } else {
//         await db.starMark.delete({
//         where: {
//           userId_playgroundId: {
//             userId,
//             playgroundId: playgroundId,

//           },
//         },
//       });
//     }

//      revalidatePath("/dashboard");
//     return { success: true, isMarked: isChecked };
//   } catch (error) {
//        console.error("Error updating problem:", error);
//     return { success: false, error: "Failed to update problem" };
//   }
// };

export const getAllPlaygroundForUser= async () => {
    const user = await currentUser()

    try {
       const playground = await db.playground.findMany({
        where:{
            userId:user?.id
        },
        include:{
            user:true
        }
       })

       return playground
    } catch (error) {
        console.log(error);
        
    }
}

export const createPlaygound = async(data) => {
    const user = await currentUser()

    const {template, title, description} = data
    try {
        const playground = await db.playground.create({
            data: {
                title:title,
                description:description,
                template: template,
                userId: user?.id
            }
        })

        return playground
    } catch (error) {
        console.log(error);
        
    }
}

export const deleteProjectById = async (id) => {
    try {
        await db.playground.delete({
            where:{
                id
            }
        })

        revalidatePath("/dashboard")
    } catch (error) {
        console.log(error);
           
    }
}


export const editProjectById = async (id ,data ) => {
    try {
        await db.playground.update({
            where:{
                id
            },
            data:data
        })

        revalidatePath("/")
    } catch (error) {
        console.log(error);
        
    }
}

export const duplicateProjectById = async (id) => {
    try {
        const originalPlaygroundData = await db.playground.findUnique({
            where:{id}
        })
        if(!originalPlaygroundData){
            throw new Error('Original playground not found')
        }
        
       const duplicatedPlayground =  await db.playground.create({
            title: `${originalPlaygroundData.title} (Copy)`,
            description: originalPlaygroundData.description,
            template: originalPlaygroundData.template,
            userId: originalPlaygroundData.userId
        })

        revalidatePath("/")
        return duplicatedPlayground
    } catch (error) {
        
    }
}