package com.ghstudios.android.features.decorations.list

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.ghstudios.android.adapter.common.SimpleRecyclerViewAdapter
import com.ghstudios.android.adapter.common.SimpleViewHolder
import com.ghstudios.android.data.classes.Decoration
import com.ghstudios.android.mhgendatabase.R
import com.ghstudios.android.mhgendatabase.databinding.FragmentDecorationListitemBinding
import com.ghstudios.android.util.setImageAsset

/**
 * A RecyclerView adapter used to display decorations
 * @param maxSlots The max possible slots. Any slot value below this number will be greyed out.
 */
class DecorationListAdapter(
        private val maxSlots: Int = Int.MAX_VALUE,
        private val onSelected: (Decoration, View) -> Unit

) : SimpleRecyclerViewAdapter<Decoration>() {
    override fun onCreateView(parent: ViewGroup): View {
        val inflater = LayoutInflater.from(parent.context)
        return inflater.inflate(R.layout.fragment_decoration_listitem,
                parent, false)
    }

    override fun bindView(viewHolder: SimpleViewHolder, data: Decoration) {
        val binding = FragmentDecorationListitemBinding.bind(viewHolder.itemView)

        with(binding) {
            itemImage.setImageAsset(data)
            item.text = data.name
            skill1.text = data.skill1Name
            skill1Amt.text = data.skill1Point.toString()
            skill2.visibility = View.GONE
            skill2Amt.visibility = View.GONE

            if (data.skill2Point != 0) {
                skill2.text = data.skill2Name
                skill2Amt.text = data.skill2Point.toString()
                skill2.visibility = View.VISIBLE
                skill2Amt.visibility = View.VISIBLE
            }
        }

        binding.root.tag = data.id

        val fitsInArmor = data.numSlots <= maxSlots

        binding.root.isEnabled = fitsInArmor
        binding.itemImage.alpha = if (fitsInArmor) 1.0f else 0.5f

        if (fitsInArmor) {
            binding.root.setOnClickListener {
                onSelected(data, viewHolder.itemView)
            }
        } else {
            binding.root.setOnClickListener(null)
        }
    }

}
